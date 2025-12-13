[中文](#巨大娘的玩耍模组) • [English](#giantesss-playmods)

# 【巨大娘的玩耍】模组

【巨大娘的玩耍】是一款肉鸽H5 3D巨大娘动作射击游戏，支持模组，您可以开发并发布自己的模组，从而在各个方面扩展游戏


[进入游戏](https://gts-play.cn/) • [进入游戏（调试模式）](https://gts-play.cn?mod)



## 准备开发环境

- 安装 node.js
- 根目录下执行 npm install && npm run bootstrap 即可


## 开发模组

**文件夹说明**

模组在mods/文件夹中；模组对应的协议（指定了其中的服务、数据的类型）在protocols/文件夹中；其它文件夹可忽略



**开发自己的模组**

1.请在mods/文件夹中增加您的模组项目，具体可参考该文件下的模组项目

2.加入模组项目后，可在根目录下执行npm run bootstrap，从而安装其依赖的npm



## 测试模组

1.填写package.json->mod字段，并将isPublic设为false，从而只可在调试模式中使用

2.在该模组项目的根目录下，执行npm run webpack && npm run publish_mod，从而打包文件，并发布

3.点击[进入](https://gts-play.cn?mod)来进入游戏（调试模式）

4.在模组->模组商店中，订阅发布的模组

5.进入游戏场景，从而测试该模组





注意：

- 可在模组的函数中使用console.log来打印数据，方便调试
- 在调试模式下，可以在游戏场景中按0，从而弹出调试面板


## 发布模组

1.填写package.json->mod字段，并将isPublic设为true

2.在该模组项目的根目录下，执行npm run webpack && npm run publish_mod，从而打包文件，并发布



# 【Giantess's Play】Mods

【Giantess's Play】 is a roguelite H5 3D giantess action shooter game that supports mods. You can develop and publish your own mods to extend the game in various aspects.

[Enter Game](https://gts-play.cn/) • [Enter Game (Debug Mode)](https://gts-play.cn?mod)

## Prepare Development Environment

- Install Node.js.
- In the root directory, run `npm install && npm run bootstrap`.

## Develop Mods

**Folder Description**

Mods are located in the `mods/` folder. The protocols corresponding to mods (specifying their services and data types) are in the `protocols/` folder. Other folders can be ignored.

**Develop Your Own Mod**

1. Add your mod project to the `mods/` folder. You can refer to the existing mod projects in that folder.
2. After adding the mod project, you can run `npm run bootstrap` in the root directory to install its required npm dependencies.

## Test Mods

1. Fill in the `mod` field in `package.json` and set `isPublic` to `false` so that it is only usable in Debug Mode.
2. In the root directory of the mod project, run `npm run webpack && npm run publish_mod` to bundle the files and publish the mod.
3. Click [Enter](https://gts-play.cn?mod) to enter the game (Debug Mode).
4. In Mods -> Mod Store, subscribe to the published mod.
5. Enter a game scene to test the mod.

**Note:**

- You can use `console.log` in the mod's functions to print data for debugging.
- In Debug Mode, you can press `0` in the game scene to open the debug panel.

## Publish Mods

1. Fill in the `mod` field in `package.json` and set `isPublic` to `true`.
2. In the root directory of the mod project, run `npm run webpack && npm run publish_mod` to bundle the files and publish the mod.