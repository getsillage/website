export type Locale = 'en' | 'zh'

export const LINKS = {
  github: 'https://github.com/getsillage/sillage',
  releases: 'https://github.com/getsillage/sillage/releases',
  docs: 'https://github.com/getsillage/sillage/tree/main/docs',
  deployment: 'https://github.com/getsillage/sillage/blob/main/docs/user/deployment.md',
  data: 'https://github.com/getsillage/sillage/blob/main/docs/user/data.md',
  ai: 'https://github.com/getsillage/sillage/blob/main/docs/user/ai.md',
  android: 'https://github.com/getsillage/sillage/tree/main/android',
  security: 'https://github.com/getsillage/sillage/blob/main/SECURITY.md',
  contributing: 'https://github.com/getsillage/sillage/blob/main/CONTRIBUTING.md',
  license: 'https://github.com/getsillage/sillage/blob/main/LICENSE',
} as const

type Messages = {
  metaTitle: string
  metaDescription: string
  skipToContent: string
  navAria: string
  navFeatures: string
  navPrivacy: string
  navDeploy: string
  navClients: string
  menuOpen: string
  menuClose: string
  langLabel: string
  themeLight: string
  themeDark: string
  heroEyebrow: string
  heroTitle: string
  heroLead: string
  ctaDeploy: string
  ctaGithub: string
  ctaDocs: string
  ctaAndroid: string
  previewLabel: string
  previewCaption: string
  flowTitle: string
  flowSteps: { title: string; body: string }[]
  featuresTitle: string
  featuresLead: string
  features: { title: string; body: string }[]
  notTitle: string
  notLead: string
  notItems: string[]
  privacyTitle: string
  privacyLead: string
  privacyItems: { title: string; body: string }[]
  privacyLink: string
  deployTitle: string
  deployLead: string
  deployNote: string
  deployOpen: string
  deployLatest: string
  deployDocs: string
  deployReleases: string
  copyCode: string
  copied: string
  clientsTitle: string
  clientsLead: string
  clientsWebTitle: string
  clientsWebBody: string
  clientsAndroidTitle: string
  clientsAndroidBody: string
  clientsStack: string
  footerTagline: string
  footerProduct: string
  footerResources: string
  footerCommunity: string
  footerGithub: string
  footerReleases: string
  footerDocs: string
  footerDeploy: string
  footerData: string
  footerAi: string
  footerAndroid: string
  footerSecurity: string
  footerContributing: string
  footerLicense: string
  footerSiteSource: string
  footerRights: string
  footerNoHosted: string
}

export const messages: Record<Locale, Messages> = {
  en: {
    metaTitle: 'Sillage — Private self-hosted records',
    metaDescription:
      'Self-hosted, single-user space for private records, history review, and AI answers grounded in your own notes.',
    skipToContent: 'Skip to content',
    navAria: 'Primary',
    navFeatures: 'Features',
    navPrivacy: 'Privacy',
    navDeploy: 'Deploy',
    navClients: 'Clients',
    menuOpen: 'Open menu',
    menuClose: 'Close menu',
    langLabel: 'Language',
    themeLight: 'Switch to light theme',
    themeDark: 'Switch to dark theme',
    heroEyebrow: 'Self-hosted · Single-user · Open source',
    heroTitle: 'A private space for records, history, and grounded answers',
    heroLead:
      'Self-hosted, single-user space for private records, history review, and AI answers grounded in your own notes.',
    ctaDeploy: 'Quick start',
    ctaGithub: 'View on GitHub',
    ctaDocs: 'Documentation',
    ctaAndroid: 'Android',
    previewLabel: 'Illustrated product interface preview',
    previewCaption: 'Illustrative preview — not a live screenshot',
    flowTitle: 'How it works',
    flowSteps: [
      {
        title: 'Write',
        body: 'Capture moments in Markdown with images and files. Drafts stay recoverable.',
      },
      {
        title: 'Revisit',
        body: 'Browse lists, calendar, and search. Favorites and archives keep things light.',
      },
      {
        title: 'Ask',
        body: 'Optional AI summarizes records and answers with sources when claims are personal.',
      },
    ],
    featuresTitle: 'Built for long-term private use',
    featuresLead:
      'Clear writing first. Organization stays lightweight. AI stays optional and source-aware.',
    features: [
      {
        title: 'Markdown records',
        body: 'Date plus body is enough. Short notes and longer writing share the same editor.',
      },
      {
        title: 'Lists, calendar, search',
        body: 'Find what you wrote through list views, a calendar, full-text search, favorites, and archives.',
      },
      {
        title: 'Source-grounded Ask',
        body: 'Personal claims cite your records. General questions stay general—without fake citations.',
      },
      {
        title: 'Your AI endpoint',
        body: 'Configure Anthropic-compatible or OpenAI-compatible endpoints. No built-in model. No vendor lock-in.',
      },
      {
        title: 'Web and Android',
        body: 'Responsive Web UI and a native Android client, in English and Simplified Chinese.',
      },
      {
        title: 'Online and offline writing',
        body: 'Write on the go with the Android client and sync records manually when ready.',
      },
    ],
    notTitle: 'What Sillage is not',
    notLead: 'Boundaries are part of the product. Knowing them builds trust.',
    notItems: [
      'Not multi-user collaboration or social publishing',
      'Not a public profile, feed, tags, or discovery surface',
      'Not a hosted SaaS—you run your own instance',
      'Not a mood tracker, diagnostic tool, or AI that directs your writing',
      'Not a full file drive or project management suite',
    ],
    privacyTitle: 'Privacy by design',
    privacyLead:
      'Your records live on your machine. AI is optional and only talks to endpoints you configure.',
    privacyItems: [
      {
        title: 'Single account per instance',
        body: 'The first visit creates the only account. Everything else requires sign-in.',
      },
      {
        title: 'Local data directory',
        body: 'SQLite, attachments, and runtime secrets stay under your data path—back up the whole directory.',
      },
      {
        title: 'Encrypted API keys',
        body: 'Provider keys are stored in encrypted envelopes and never returned by the API.',
      },
      {
        title: 'Clear AI data flow',
        body: 'Summaries and Ask send only what that operation needs. Attachment bytes are not uploaded as AI content.',
      },
    ],
    privacyLink: 'Read AI usage and privacy',
    deployTitle: 'Deploy on your machine',
    deployLead:
      'Pull a release image from GHCR and bind only to localhost unless you add your own HTTPS front door.',
    deployNote:
      'Public ingress, TLS, DNS, tunnels, and CDNs are yours to operate. Sillage stays vendor-neutral. Prefer version tags over latest in production.',
    deployOpen: 'After the container starts, open http://localhost:5231 and create the only account.',
    deployLatest: 'Latest release',
    deployDocs: 'Full deployment guide',
    deployReleases: 'GitHub Releases',
    copyCode: 'Copy',
    copied: 'Copied',
    clientsTitle: 'Clients',
    clientsLead: 'One instance, two clients. Same records, same boundaries.',
    clientsWebTitle: 'Web',
    clientsWebBody:
      'React interface embedded in the Go binary. Light and dark themes, English and Simplified Chinese.',
    clientsAndroidTitle: 'Android',
    clientsAndroidBody:
      'Native Kotlin and Jetpack Compose client with online and offline writing, and manual record sync.',
    clientsStack: 'Go · Echo · SQLite · React · TypeScript · Kotlin · Compose · Protobuf',
    footerTagline: 'Self-hosted private records.',
    footerProduct: 'Product',
    footerResources: 'Resources',
    footerCommunity: 'Community',
    footerGithub: 'GitHub',
    footerReleases: 'Releases',
    footerDocs: 'Documentation',
    footerDeploy: 'Deployment',
    footerData: 'Data & backup',
    footerAi: 'AI & privacy',
    footerAndroid: 'Android',
    footerSecurity: 'Security policy',
    footerContributing: 'Contributing',
    footerLicense: 'MIT License',
    footerSiteSource: 'This website',
    footerRights: 'Open source under the MIT License.',
    footerNoHosted: 'No official hosted service.',
  },
  zh: {
    metaTitle: 'Sillage — 自托管的私密记录空间',
    metaDescription:
      '自托管的单人记录空间：保存日常记录、回看历史，并基于自己的记录进行 AI 总结与问答。',
    skipToContent: '跳到正文',
    navAria: '主导航',
    navFeatures: '能力',
    navPrivacy: '隐私',
    navDeploy: '部署',
    navClients: '客户端',
    menuOpen: '打开菜单',
    menuClose: '关闭菜单',
    langLabel: '语言',
    themeLight: '切换到浅色主题',
    themeDark: '切换到深色主题',
    heroEyebrow: '自托管 · 单人 · 开源',
    heroTitle: '写下日常，回看历史，基于自己的记录提问',
    heroLead:
      '自托管的单人记录空间：保存日常记录、回看历史，并基于自己的记录进行 AI 总结与问答。',
    ctaDeploy: '快速开始',
    ctaGithub: '查看 GitHub',
    ctaDocs: '文档',
    ctaAndroid: 'Android',
    previewLabel: '产品界面示意预览',
    previewCaption: '界面示意，非真实截图',
    flowTitle: '如何使用',
    flowSteps: [
      {
        title: '写记录',
        body: '用 Markdown 写下片段，可附图片与文件；未提交草稿可恢复。',
      },
      {
        title: '回看',
        body: '列表、日历与搜索；收藏和归档保持轻量整理。',
      },
      {
        title: '问答',
        body: '可选 AI 总结记录；涉及个人历史的结论会引用记录来源。',
      },
    ],
    featuresTitle: '为长期私密使用而设计',
    featuresLead: '写作优先，整理保持轻量；AI 可选，个人结论有来源。',
    features: [
      {
        title: 'Markdown 记录',
        body: '日期与正文即可。短记与长文共用同一编辑器。',
      },
      {
        title: '列表、日历、搜索',
        body: '通过列表、日历、全文搜索、收藏与归档找回写下的内容。',
      },
      {
        title: '有来源的问答',
        body: '关于个人生活的论断需引用记录；一般问题可自然作答，不伪造来源。',
      },
      {
        title: '自配 AI 端点',
        body: '配置兼容 Anthropic 或 OpenAI 协议的端点。无内置模型，无厂商绑定。',
      },
      {
        title: 'Web 与 Android',
        body: '响应式 Web 界面与原生 Android 客户端，支持简体中文与英文。',
      },
      {
        title: '在线与离线书写',
        body: 'Android 可离线写记录，需要时再手动同步。',
      },
    ],
    notTitle: 'Sillage 不是什么',
    notLead: '边界是产品的一部分。说清楚，反而更值得信任。',
    notItems: [
      '不是多人协作或社交发布平台',
      '不是公开主页、动态流、标签或发现系统',
      '不是官方托管 SaaS——由你自己运行实例',
      '不是情绪追踪、诊断工具，或替你主导表达的 AI',
      '不是完整网盘或项目管理套件',
    ],
    privacyTitle: '隐私优先',
    privacyLead: '记录保存在你的机器上。AI 可选，且只连接你配置的端点。',
    privacyItems: [
      {
        title: '每实例唯一账号',
        body: '首次打开创建唯一账号。之后访问记录、附件、总结与问答均需登录。',
      },
      {
        title: '本地数据目录',
        body: 'SQLite、附件与运行时密钥位于你的数据路径——备份请复制整个目录。',
      },
      {
        title: '加密的 API 密钥',
        body: '服务商密钥以加密信封存储，接口从不返回明文。',
      },
      {
        title: '清晰的 AI 数据流',
        body: '总结与问答只发送该操作所需内容。附件字节不会作为 AI 内容上传。',
      },
    ],
    privacyLink: '阅读 AI 使用与隐私',
    deployTitle: '部署到你的机器',
    deployLead: '从 GHCR 拉取发布镜像；默认只绑定本机。公网访问请自行配置 HTTPS 入口。',
    deployNote: '公网入口、TLS、DNS、隧道与 CDN 由部署者自管。Sillage 保持厂商中立。生产环境优先使用版本 tag，而不是 latest。',
    deployOpen: '容器启动后打开 http://localhost:5231，按提示创建唯一账号。',
    deployLatest: '最新版本',
    deployDocs: '完整部署说明',
    deployReleases: 'GitHub Releases',
    copyCode: '复制',
    copied: '已复制',
    clientsTitle: '客户端',
    clientsLead: '一个实例，两种客户端。同一套记录，同一套边界。',
    clientsWebTitle: 'Web',
    clientsWebBody: 'React 界面嵌入 Go 二进制。支持浅色/深色主题，以及简体中文与英文。',
    clientsAndroidTitle: 'Android',
    clientsAndroidBody: 'Kotlin 与 Jetpack Compose 原生客户端，支持在线/离线书写与手动同步记录。',
    clientsStack: 'Go · Echo · SQLite · React · TypeScript · Kotlin · Compose · Protobuf',
    footerTagline: '自托管的私密记录空间。',
    footerProduct: '产品',
    footerResources: '资源',
    footerCommunity: '社区',
    footerGithub: 'GitHub',
    footerReleases: '版本发布',
    footerDocs: '文档',
    footerDeploy: '部署',
    footerData: '数据与备份',
    footerAi: 'AI 与隐私',
    footerAndroid: 'Android',
    footerSecurity: '安全策略',
    footerContributing: '贡献指南',
    footerLicense: 'MIT 许可证',
    footerSiteSource: '本网站源码',
    footerRights: '以 MIT 许可证开源。',
    footerNoHosted: '无官方托管服务。',
  },
}
