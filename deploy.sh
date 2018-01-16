#!/bin/sh

# $0 deploy.sh
# $1 node environment
# $2 port: xxxx

export TOP_PID=$$
trap 'exit 1' TERM

exit_script() {
  kill -s TERM ${TOP_PID}
}

oldpath="$(cd `dirname ${0}`; pwd)/Dockerfile"
if [ -f "${oldpath}" ]; then
  newpath="${oldpath}.backup.$(date +%s)"
  mv "${oldpath}" "${newpath}"
  if [ -f "${newpath}" ]; then
    echo "${newpath}"
    rm -f "${newpath}"
  fi
fi

NODE_ENV="${1}"
PORT_ARGS="${2}"

image_name="hoolai-web-admin-${NODE_ENV}"
container_name="${image_name}"
project_dir="/var/www/hoolai-web/${image_name}"
node_arg="pre${NODE_ENV}"
pm2_conf="pm2.${NODE_ENV}.json"
pm2_logs="/var/www/log/pm2/admin/${NODE_ENV}:/root/.pm2/logs"

(
cat <<EOF
FROM node:8-alpine

RUN rm -rf /etc/apk/repositories
COPY repositories /etc/apk/repositories

RUN apk add --update curl bash python2 && \
    rm -rf /var/cache/apk/*

RUN npm config set registry https://registry.npm.taobao.org && \
    npm install pm2 -g

RUN mkdir -p ${project_dir}
WORKDIR ${project_dir}
COPY package*.json ${project_dir}/

RUN npm install && \
    npm rebuild sass-loader --force

COPY . ${project_dir}/
RUN npm run ${node_arg}

HEALTHCHECK CMD curl --fail http://localhost:${PORT_ARGS} || exit 1
EXPOSE ${PORT_ARGS}
CMD [ "pm2-docker", "start", "${pm2_conf}" ]
EOF
) >> "${oldpath}"

if [ ! -f "${oldpath}" ]; then
  exit exit_script
fi

command -v docker >/dev/null 2>&1 ||
{
  echo >&2 "docker: not exists"
  exit 1
}

docker build -t ${image_name} .

docker run -d -v ${pm2_logs} --restart unless-stopped --name ${container_name} ${image_name}
