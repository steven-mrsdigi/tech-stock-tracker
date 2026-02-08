# OpenClaw Linux 安裝與 Discord 連結完整指南

## 📋 目錄

1. [系統需求](#系統需求)
2. [安裝 Node.js](#安裝-nodejs)
3. [安裝 OpenClaw](#安裝-openclaw)
4. [配置 Discord Bot](#配置-discord-bot)
5. [連結 Discord 頻道](#連結-discord-頻道)
6. [常見問題](#常見問題)

---

## 系統需求

- **作業系統**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+ / 其他 Linux 發行版
- **記憶體**: 最少 2GB RAM（建議 4GB）
- **儲存空間**: 最少 5GB 可用空間
- **網路**: 穩定的網路連線

---

## 安裝 Node.js

### 步驟 1: 更新系統套件

```bash
sudo apt update && sudo apt upgrade -y
```

### 步驟 2: 安裝 Node.js 20.x (推薦)

```bash
# 安裝 NodeSource 套件庫
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -

# 安裝 Node.js
sudo apt install -y nodejs

# 驗證安裝
node --version  # 應該顯示 v20.x.x
npm --version   # 應該顯示 10.x.x
```

### 步驟 3: 安裝必要工具

```bash
sudo apt install -y git curl wget build-essential
```

---

## 安裝 OpenClaw

### 步驟 1: 全域安裝 OpenClaw

```bash
# 使用 npm 全域安裝
sudo npm install -g openclaw

# 驗證安裝
openclaw --version
```

### 步驟 2: 創建 OpenClaw 配置目錄

```bash
# 創建主目錄
mkdir -p ~/.openclaw
cd ~/.openclaw

# 創建工作空間
mkdir -p workspace
```

### 步驟 3: 初始化配置

```bash
# 運行配置嚮導
openclaw configure

# 按照提示設置:
# - 選擇語言: 英文或中文
# - 設置工作目錄: ~/.openclaw/workspace
# - 其他選項保持默認
```

---

## 配置 Discord Bot

### 步驟 1: 創建 Discord 應用

1. 訪問 https://discord.com/developers/applications
2. 點擊 **"New Application"** 按鈕
3. 輸入應用名稱（例如: `My OpenClaw Bot`）
4. 點擊 **"Create"**

### 步驟 2: 創建 Bot

1. 在左側菜單點擊 **"Bot"**
2. 點擊 **"Add Bot"** → **"Yes, do it!"**
3. 在 **"TOKEN"** 區域，點擊 **"Reset Token"** → **"Copy"**
   - ⚠️ **重要**: 保存這個 Token，只會顯示一次！

### 步驟 3: 設置 Bot 權限

1. 在 Bot 頁面，找到 **"Privileged Gateway Intents"**
2. 開啟以下選項:
   - ✅ **MESSAGE CONTENT INTENT** (必須)
   - ✅ **SERVER MEMBERS INTENT** (可選)
   - ✅ **PRESENCE INTENT** (可選)
3. 點擊 **"Save Changes"**

### 步驟 4: 邀請 Bot 加入伺服器

1. 左側菜單點擊 **"OAuth2"** → **"URL Generator"**
2. 在 **SCOPES** 選擇:
   - ✅ **bot**
3. 在 **BOT PERMISSIONS** 選擇:
   - ✅ **Send Messages**
   - ✅ **Read Messages/View Channels**
   - ✅ **Read Message History**
   - ✅ **Embed Links**
   - ✅ **Attach Files**
   - ✅ **Use External Emojis**
   - ✅ **Add Reactions**
   - ✅ **Manage Messages** (可選)
   - ✅ **Manage Channels** (可選)
4. 複製生成的 URL
5. 在瀏覽器打開該 URL
6. 選擇要加入的伺服器
7. 點擊 **"Authorize"** → **"Authorize"**
8. 完成驗證碼

---

## 連結 Discord 頻道

### 步驟 1: 配置 OpenClaw Discord 設定

```bash
# 編輯 OpenClaw 配置
openclaw config edit
```

添加以下 Discord 配置:

```json
{
  "channels": {
    "discord": {
      "token": "你的_BOT_TOKEN_這裡",
      "enabled": true,
      "groupPolicy": "allowlist",
      "guilds": {
        "你的_GUILD_ID": {
          "slug": "my-server",
          "channels": {
            "頻道_ID": {
              "allow": true,
              "requireMention": false
            }
          }
        }
      }
    }
  }
}
```

### 步驟 2: 獲取必要 ID

#### 獲取 Guild ID (伺服器 ID):
1. 在 Discord 中，右鍵點擊伺服器名稱
2. 點擊 **"Copy Server ID"** (如果沒有看到，先在設定中開啟開發者模式)

#### 獲取 Channel ID (頻道 ID):
1. 右鍵點擊頻道名稱
2. 點擊 **"Copy Channel ID"**

#### 開啟開發者模式:
1. Discord 設定 → **Advanced**
2. 開啟 **Developer Mode**

### 步驟 3: 配置 Agent

```bash
# 創建或編輯 agent 配置
openclaw agents create main

# 設置參數:
# - ID: main
# - Model: 選擇你想要使用的模型 (例如: openrouter/moonshotai/kimi-k2.5)
# - Workspace: ~/.openclaw/workspace
```

### 步驟 4: 設置 Binding

```bash
openclaw bindings add

# 配置:
# - Agent ID: main
# - Channel: discord
# - Guild ID: 你的伺服器ID
# - Channel ID: 你的頻道ID
```

### 步驟 5: 啟動 Gateway

```bash
# 啟動 OpenClaw Gateway
openclaw gateway start

# 或在背景運行
openclaw gateway start --daemon

# 查看日誌
openclaw logs
```

---

## 驗證連結

### 測試 Bot 是否上線

1. 在 Discord 頻道中輸入:
   ```
   /status
   ```

2. 如果看到回應，表示連結成功！

### 測試基本功能

```
你好，請問你是誰？
```

Bot 應該會回應你的訊息。

---

## 常見問題

### Q1: 顯示 "Gateway connection failed"

**解決方法:**
```bash
# 檢查 Token 是否正確
openclaw config get channels.discord.token

# 重新設置 Token
openclaw config set channels.discord.token "你的新Token"
```

### Q2: Bot 上線但沒有回應訊息

**檢查項目:**
1. 確認 Intents 已開啟
2. 檢查頻道權限設置
3. 查看日誌:
   ```bash
   openclaw logs --tail 100
   ```

### Q3: 如何更新 OpenClaw

```bash
sudo npm update -g openclaw
```

### Q4: 如何停止 Gateway

```bash
openclaw gateway stop
```

### Q5: 如何查看所有配置

```bash
openclaw config get
```

---

## 進階配置

### 配置多個 Discord 頻道

```json
{
  "channels": {
    "discord": {
      "token": "YOUR_TOKEN",
      "enabled": true,
      "guilds": {
        "GUILD_ID_1": {
          "channels": {
            "CHANNEL_ID_1": { "allow": true },
            "CHANNEL_ID_2": { "allow": true }
          }
        }
      }
    }
  }
}
```

### 配置模型

```bash
# 查看可用模型
openclaw models list

# 設置默認模型
openclaw config set agents.defaults.model.primary "openrouter/moonshotai/kimi-k2.5"
```

### 配置記憶功能

```bash
# 啟用記憶搜索
openclaw config set agents.defaults.memorySearch.enabled true
```

---

## 安全建議

1. **保護 Token**: 不要分享你的 Discord Bot Token
2. **定期備份**: 備份 `~/.openclaw/` 目錄
3. **更新密碼**: 定期更新 API keys
4. **監控日誌**: 定期查看 `~/.openclaw/logs/`

---

## 獲取幫助

- **官方文檔**: https://docs.openclaw.ai
- **GitHub**: https://github.com/openclaw/openclaw
- **Discord 社群**: https://discord.com/invite/clawd

---

## 快速命令參考

```bash
# 安裝
sudo npm install -g openclaw

# 配置
openclaw configure
openclaw config edit

# 啟動/停止
openclaw gateway start
openclaw gateway stop
openclaw gateway restart

# 查看狀態
openclaw status
openclaw logs

# Agent 管理
openclaw agents list
openclaw agents create main
openclaw agents delete main

# 更新
sudo npm update -g openclaw
```

---

**版本**: 2026-02-07  
**適用 OpenClaw 版本**: 2026.2.x  
**作者**: OpenClaw Assistant
