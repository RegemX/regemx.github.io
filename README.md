# Gemocracy Official Website Repository / Gemocracy 官方网站仓库  

Gemocracy — A RuleGems-based Minecraft multiplayer server / Gemocracy — 基于 RuleGems 的 Minecraft 多人服务器  

This repository hosts the full source code and resources for the Gemocracy official website, automatically deployed via GitHub Pages.  
Admins can directly maintain announcements, events, download links, and documentation here; changes go live on commit.  
本仓库托管 Gemocracy 官方网站的全部源码与资源，采用 GitHub Pages 自动发布。  
管理员可直接在此维护公告、活动、下载链接及文档，提交即上线。

## 🎮 About Gemocracy / 关于 Gemocracy

Gemocracy is a revolutionary Minecraft SMP server where **players rule the world**. Instead of traditional admin systems, power is distributed through 7 magical gems scattered throughout the world. Each gem grants specific administrative abilities, creating a dynamic and ever-changing political landscape.

Gemocracy 是一个革命性的 Minecraft SMP 服务器，在这里**玩家统治世界**。与传统管理员系统不同，权力通过散布在世界中的 7 种魔法宝石进行分配。每种宝石赋予特定的管理能力，创造了一个动态且不断变化的政治格局。

### Core Features / 核心特色
- **Player-Governed System** / 玩家自治系统
- **7 Gems of Power** / 7 种权力宝石
- **Dynamic Power Cycle** / 动态权力循环
- **No Permanent Admins** / 无永久管理员
- **Raw Survival Experience** / 原始生存体验

## 🚀 Quick Start / 快速开始

### Server Connection / 服务器连接
```
Server IP: mc.gemocracy.org
Version: Minecraft 1.20+
```

### Local Development / 本地开发
```bash
# Clone the repository
# 克隆仓库
git clone https://github.com/RegemX/RegemX.github.io.git

# Open index.html in browser
# 在浏览器中打开 index.html
open index.html

# Or use the preview script (Windows)
# 或使用预览脚本 (Windows)
start_preview.bat
```

## 📁 Project Structure / 项目结构

```
Gemocracy-Website/
├── index.html              # Main homepage / 主页面
├── server_info.html        # Server information page / 服务器信息页面
├── gems.yml                # Gem configuration data / 宝石配置数据
├── css/                    # Stylesheets / 样式表
│   ├── style.css          # Main styles / 主样式
│   ├── gem.css            # Gem-specific styles / 宝石样式
│   └── toast.css          # Notification styles / 通知样式
├── js/                     # JavaScript modules / JavaScript 模块
│   ├── main.js            # Three.js 3D rendering / 3D 渲染
│   ├── slider.js          # Slide navigation / 幻灯片导航
│   └── gem-data.js        # Gem data configuration / 宝石数据配置
├── images/                 # Static assets / 静态资源
│   ├── blocks/            # Minecraft block textures / 方块纹理
│   ├── *.webp             # Gallery images / 画廊图片
│   └── banner.mp4         # Background video / 背景视频
├── CNAME                  # Custom domain configuration / 自定义域名配置
├── .gitignore            # Git ignore rules / Git 忽略规则
└── README.md             # This file / 本文件
```

## 🛠️ Technical Stack / 技术栈

### Frontend Technologies / 前端技术
- **HTML5** - Semantic structure / 语义化结构
- **CSS3** - Modern styling with animations / 现代化样式与动画
- **JavaScript ES6+** - Interactive functionality / 交互功能
- **Three.js** - 3D gem visualization / 3D 宝石可视化
- **Font Awesome** - Icon library / 图标库

### Deployment / 部署
- **GitHub Pages** - Automatic hosting / 自动托管
- **Custom Domain** - regemx.org / 自定义域名
- **CDN Integration** - External libraries / CDN 集成

## 🎯 The 7 Gems of Power / 7 种权力宝石

| Gem / 宝石 | Power / 能力 | Description / 描述 |
|-----------|-------------|------------------|
| Justice / 正义 | Jail Authority | Authority to punish players / 惩罚玩家权限 |
| Truth / 真理 | Log Access | View server logs and history / 查看服务器日志和历史 |
| Flight / 飞行 | Temporary Flight | Grant temporary flight ability / 授予临时飞行能力 |
| Life / 生命 | Healing Power | Restore health to players / 恢复玩家生命值 |
| Assassin / 刺客 | PvP Control | Appoint and dismiss assassins / 任命和罢免刺客 |
| Land / 土地 | Territory Admin | Manage server territories / 管理服务器领地 |
| Navigation / 导航 | Gem Tracking | Locate other gems in the world / 定位世界中的其他宝石 |

## 🌐 Website Features / 网站功能

### Interactive Elements / 交互元素
- **3D Gem Dock** - Hover to see gem details / 悬停查看宝石详情
- **Slide Navigation** - Smooth transitions between sections / 平滑的页面切换
- **Responsive Design** - Mobile-friendly interface / 移动端友好界面
- **Copy IP Function** - One-click server IP copy / 一键复制服务器 IP

### Content Sections / 内容板块
1. **Home** - Server introduction and connection / 服务器介绍与连接
2. **Philosophy** - Gemocracy's unique governance / Gemocracy 独特治理理念
3. **Features** - Server capabilities and mechanics / 服务器功能与机制
4. **Gallery** - In-game screenshots / 游戏截图展示
5. **Team** - Server ownership information / 服务器团队信息

## 🔧 Development Guide / 开发指南

### Adding New Gems / 添加新宝石
1. Edit `js/gem-data.js` to add gem configuration
2. Add corresponding texture in `images/blocks/`
3. Update gem descriptions and powers

### Modifying Styles / 修改样式
- Main styles: `css/style.css`
- Gem-specific styles: `css/gem.css`
- Responsive breakpoints included

### Adding Content / 添加内容
- Update HTML structure in `index.html`
- Add new images to `images/` directory
- Update gem data in `js/gem-data.js`

## 📞 Contact & Support / 联系与支持

- **Discord**: [Join our community](https://discord.gg/WWQSppxDWa)
- **GitHub**: [RegemX Organization](https://github.com/RegemX)
- **QQ Group**: [Join QQ group](https://qm.qq.com/q/caVZGSf8VG)
- **Server IP**: `mc.gemocracy.org`

## 📄 License / 许可证

This project is part of the Gemocracy Minecraft server. All rights reserved.
本项目为 Gemocracy Minecraft 服务器的一部分。保留所有权利。

---

**文件编写日期**: 2025/12/26 22:07 (北京时间)  
**Document Creation Date**: 2025/12/26 22:07 (Beijing Time)  
**Last Updated**: 2026/01/28 (Current Update)

