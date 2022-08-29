<img src="https://fastly.jsdelivr.net/gh/webyang-male/yangimgs/docker.webp" style="width:760px;height:430px;"/>

Docker 作为轻量级虚拟化技术，拥有持续集成、版本控制、可移植性、隔离性和安全性等优势。本文使用Docker来部署一个vue的前端应用，并尽可能详尽的介绍了实现思路和具体步骤，以方便有类似需要的同学参考。

> Docker 是一个开源的应用容器引擎，让开发者可以打包他们的应用以及依赖包到一个可移植的容器中，该容器包含了应用程序的代码、运行环境、依赖库、配置文件等必需的资源，通过容器就可以实现方便快速并且与平台解耦的自动化部署方式，无论你部署时的环境如何，容器中的应用程序都会运行在同一种环境下。（更多详情请移步docker官网查看[docker](https://link.juejin.cn?target=https%3A%2F%2Fwww.docker.com%2F)）

对 Docker 最简单并且带有一定错误的认知就是 “Docker 是一种性能非常好的虚拟机”。

正如上面所说，这是有一定错误的说法。Docker 相比于传统虚拟机的技术来说先进了不少，具体表现在 Docker 不是在宿主机上虚拟出一套硬件后再虚拟出一个操作系统，而是让 Docker 容器里面的进程直接运行在宿主机上（Docker 会做文件、网络等的隔离），这样一来 Docker 会 “体积更轻、跑的更快、同宿主机下可创建的个数更多”。

Docker 中有三个核心概念：Image、Container、Repository。

- **Image：** 有领“好人卡”倾向的广大程序猿一定对 **镜像** 的概念不会陌生。但和 windows 的那种 iso 镜像相比，Docker 中的镜像是分层的，可复用的，而非简单的一堆文件迭在一起（类似于一个压缩包的源码和一个 git 仓库的区别）。
- **Container：** 容器的存在离不开镜像的支持，他是镜像运行时的一个载体（类似于实例和类的关系）。依托 Docker 的虚拟化技术，给容器创建了独立的端口、进程、文件等“空间”，Container 就是一个与宿机隔离 “容器”。容器可宿主机之间可以进行 port、volumes、network 等的通信。
- **Repository：** Docker 的仓库和 git 的仓库比较相似，拥有仓库名、tag。在本地构建完镜像之后，即可通过仓库进行镜像的分发。常用的 Docker hub 有 https://hub.docker.com/ 、 https://cr.console.aliyun.com/ 等。


作者：rccoder
链接：https://juejin.cn/post/6844903591375814669
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。




作者：前端论道
链接：https://juejin.cn/post/6844903837774397447
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

------
