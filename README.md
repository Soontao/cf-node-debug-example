# cf nodejs application debug example

![Node CI](https://github.com/Soontao/cf-node-debug-example/workflows/Node%20CI/badge.svg)

this project is integrated with typescript so maybe it will be little complex than other pure native nodejs application.

![](https://res.cloudinary.com/digf90pwi/image/upload/v1589340841/cf-node-debug-example_2_c6dnzi.png)

## Setup

* `cf` cli must has logged in before.
* `git clone` this project

## Steps

1. (optional) write your own business logic
1. `npm build` to build native nodejs code
1. `cf push` to deploy application
1. after the application deployed successful, just run the `cf ssh cf-node-debug-example -N -L 39999:127.0.0.1:39999` command, or vscode task `connect-ssh-tunnel`, this command will BLOCK your shell without any output (if successful).
1. use vscode predefined `remote-debug` profile start your debug, OR use the `chrome://inspect` tool to debug.
s
## Key Points

* specify the start `command` for cloud foundry in `manifest.yml`. 
    * the `node --inspect=39999` option will let the nodejs runtime start debugger server at 39999 port.
    * `node --inspect` will not wait a debugger attach, it means the server can run without debugger.
    * and, application server will not stop when debugger dis-connected from it.
    * in another words, developers could connect & dis-connect to the debugger server again & again.
* create tunnel between cloud foundry and your host by `cf ssh APP_NAME -L LOCAL_PORT:REMOTE_HOST:REMOTE_PORT`, and `ssh -L` is a ssh option, just ref the ssh document.
    * the command `cf ssh -L 9999:127.0.0.1:39999`, means the remote nodejs application debugger server `39999` port will be mapped to YOUR host `9999` port.
    * the `APP_NAME` is defined in the `manifest.yml` file.
    * the `REMOTE_HOST` must be set as `127.0.0.1` because you just want to access the host which running the nodejs app (instead of others, its defined by `ssh`).
* the vscode launch configuration `remote-debug`
    * `configurations[name=remote-debug].port` means the local debugger port, if you use another port in `cf ssh tunnel`, change this.
    * `configurations[name=remote-debug].remoteRoot` means the remote source code base directory, for cloud foundry, please always set it as `/home/vcap/app` is fine, this configuration will make your `vscode` & `sourcemap` will work.
* if you don't have source code, or your local source code is out-of-date, just use the `chrome://inspect` tool is OK, and it will fetch the compiled source code from cloud foundry.
    * remember to add `39999` as debugger connection, or map remote `39999` port to a default port (`9222`/`9229`).
* application with load balancer (multi instances)
    * ref this [doc](https://docs.cloudfoundry.org/devguide/deploy-apps/ssh-apps.html#ssh-common-flags), specify the instance index.
    * but, you know, generally, you don't know which instance should to be debug, its a complex topic, and you need other tools.

## Screenshots

### Debug with vscode & sourcemap

![](https://res.cloudinary.com/digf90pwi/image/upload/c_scale,h_851/v1589337758/2020-05-13_10-20-21_caoo3e.png)

### Debug with chrome inspect tool

![](https://res.cloudinary.com/digf90pwi/image/upload/c_scale,h_833/v1589337761/2020-05-13_10-38-36_ceaoew.png)