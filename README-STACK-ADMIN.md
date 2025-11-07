# Hugo Stack + 浅蓝主题 + Decap CMS 升级包

把本包**合并到仓库根目录**（Carlos-Guo/lanse-stack）即可：
- 浅蓝背景样式：`layouts/partials/head/custom.html`
- 在线写作后台：`/admin`（`static/admin/*`）
- GitHub OAuth for Decap：`/functions/api/auth.js`
- 图片上传目录：`static/uploads`

## 一次性配置
1) GitHub → Settings → Developer settings → OAuth Apps → New OAuth App
   - Homepage URL: https://www.lansetiankong.space
   - Authorization callback URL: https://www.lansetiankong.space/api/callback
   - 记下 Client ID / Client Secret

2) Cloudflare Pages → 项目 → Settings → Environment variables（Production）
   - GITHUB_CLIENT_ID = 上一步 Client ID
   - GITHUB_CLIENT_SECRET = 上一步 Client Secret
   - HUGO_VERSION = extended_0.124.1
   - HUGO_ENV = production
   - 保存后 Re-deploy

完成后访问：**/admin** 登录 GitHub 在线写作，内容会提交到 `content/posts/` 并自动部署。
