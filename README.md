## Build Setup

```bash
# install dependencies
$ npm run install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

# launch a project using docker

docker build -t registry.gitlab.com/vik_kod/nuxtjs_docker_example .

docker run -p 3000:3000 registry.gitlab.com/vik_kod/nuxtjs_docker_example
