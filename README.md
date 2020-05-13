# cf nodejs application debug example

![Node CI](https://github.com/Soontao/cf-node-debug-example/workflows/Node%20CI/badge.svg)

typescript express project with sourcemap

## Setup

* `cf` cli must has logged in before.
* git clone this project

## Steps

1. (optional) write your own business logic
1. `npm build` to build native nodejs code
1. `cf push` to deploy application
1. after deploy successful, run `cf ssh cf-node-debug-example  -N -L 39999:127.0.0.1:39999`, or vscode task `connect-ssh-tunnel`, this command will block your shell.
1. use vscode predefined `remote-debug` profile start your debug, OR use the `chrome://inspect` tool to debug.

## Key Points

* specify the start `command` for cloud foundry in `manifest.yml`. 
    * the `node --inspect=39999` option will let the nodejs runtime start debugger server at 39999 port.
    * `node --inspect` will not wait a debugger attach, it means the server can run without debugger.
    * and, application server will not stop when debugger dis-connected from it.
    * in another words, developers could connect & dis-connect to the debugger server again & again.
* create tunnel between cloud foundry and your host by `cf ssh -L LOCAL_PORT:REMOTE_HOST:REMOTE_PORT`, and `ssh -L` is a ssh option, just ref the ssh document.
    * `cf ssh -L 9999:127.0.0.1:39999`, means the remote nodejs process debugger server will be mapped to localhost:9999
    * the `REMOTE_HOST` must be set as `127.0.0.1` because you just want to access the host running nodejs app (instead of others)
* the vscode launch configuration `remote-debug`
    * `configurations[name=remote-debug].port` means the local debugger port, if you use another port in `cf ssh tunnel`, change this.
    * `configurations[name=remote-debug].remoteRoot` means the remote source code base directory, for cloud foundry, please always set it as `/home/vcap/app` is fine, this configuration will make your `vscode` & `sourcemap` will work.
* if you don't have source code, or your local source code is out-of-date, just use `chrome://inspect` is OK, the tool will fetch the compiled source code from cloud foundry.
    * remember to add `39999` as debugger connection, or map remote `39999` port to a default port (`9222`/`9229`).
* application with load balancer (multi instances)
    * ref this [doc](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-common-flags), specify the instance index.
    * but, you know, generally, you don't know which instance you should to debug, its a complex topic, you need other tools.

## Screenshots

### Debug with vscode & sourcemap

![](https://res.cloudinary.com/digf90pwi/image/upload/c_scale,h_851/v1589337758/2020-05-13_10-20-21_caoo3e.png)

### Debug with chrome inspect tool

![](https://res.cloudinary.com/digf90pwi/image/upload/c_scale,h_833/v1589337761/2020-05-13_10-38-36_ceaoew.png)