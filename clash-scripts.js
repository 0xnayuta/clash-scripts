// 国内 DNS 服务器
const domesticNameservers = [
  "https://doh.pub/dns-query", // TencentDNS
  "https://dns.alidns.com/dns-query", // ALiDNS  
];

// 国外 DNS 服务器
const foreignNameservers = [
  "https://dns.google/dns-query", // GoogleDNS
  "https://cloudflare-dns.com/dns-query", // CloudFlareDNS
];

// DNS 配置
const dnsConfig = {
  "enable": true,
  "listen": ":1053",
  "ipv6": true,
  "prefer-h3": true,
  "respect-rules": false,
  "use-hosts": false,
  "use-system-hosts": false,
  "cache-algorithm": "arc",
  "enhanced-mode": "fake-ip",
  "fake-ip-range": "198.18.0.1/16",
  "fake-ip-filter": [
    // 本地主机/设备
    "+.lan",
    "+.local",
    "+.arpa",
    // // Windows 网络出现小地球图标
    "+.msftconnecttest.com",
    "+.msftncsi.com",
    // 微信快速登录检测失败
    "localhost.work.weixin.qq.com",
    // QQ 快速登录检测失败
    "localhost.ptlogin2.qq.com",
    "localhost.sec.qq.com",
    // 追加以下条目
    "+.in-addr.arpa", 
    "+.ip6.arpa",
    "pool.ntp.org",
    "time.apple.com",
    "time.android.com",
    "time.windows.com",
    "time.cloudflare.com",
    "ntp.aliyun.com",
    "ntp.tencent.com",
    "+.steamcontent.com",
    "+.steamstatic.com",
    "+.steamserver.net",
    "+.test.steampowered.com",
    "+.api.steampowered.com",
    "+.cm.steampowered.com",
    "+.akamaihd.net"
  ],

  // 必须使用真实的国内 DNS
  "default-nameserver": ["159.226.8.6","159.226.8.7"],

  // 所有非命中 policy 的域名走国外 DNS
  "nameserver": [...foreignNameservers],

  // 所有国内域名由国内 DNS 解析
  "nameserver-policy": {
    "geosite:private,cn,apple-cn": domesticNameservers
  },

  // 代理后的 DNS 查询路径
  "proxy-server-nameserver": [...foreignNameservers],
  "direct-nameserver": [...domesticNameservers]
};

// 规则集通用配置
const ruleProviderCommon = {
  "type": "http",
  "format": "yaml",
  "interval": 86400
};

const RULESET_CDN_BASE = "https://cdn.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash";

// 规则集配置
const ruleProviders = {
  "Direct": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/Direct/Direct.yaml`,
    "path": "./ruleset/ios_rule_script/Direct.yaml"
  },
  "Hijacking": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/Hijacking/Hijacking.yaml`,
    "path": "./ruleset/ios_rule_script/Hijacking.yaml"
  },
  "Privacy": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/Privacy/Privacy_Classical.yaml`,
    "path": "./ruleset/ios_rule_script/Privacy_Classical.yaml"
  },
  "AdvertisingLite": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/AdvertisingLite/AdvertisingLite_Classical.yaml`,
    "path": "./ruleset/ios_rule_script/AdvertisingLite_Classical.yaml"
  },
  "Download": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/Download/Download.yaml`,
    "path": "./ruleset/ios_rule_script/Download.yaml"
  },
  "PrivateTracker": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/PrivateTracker/PrivateTracker.yaml`,
    "path": "./ruleset/ios_rule_script/PrivateTracker.yaml"
  },
  "Lan": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/Lan/Lan.yaml`,
    "path": "./ruleset/ios_rule_script/Lan.yaml"
  },
  "Global": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/Global/Global_Classical.yaml`,
    "path": "./ruleset/ios_rule_script/Global_Classical.yaml"
  },
  "SteamCN": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/SteamCN/SteamCN.yaml`,
    "path": "./ruleset/ios_rule_script/SteamCN.yaml"
  },
  "Steam": {
    ...ruleProviderCommon,
    "behavior": "classical",
    "url": `${RULESET_CDN_BASE}/Steam/Steam.yaml`,
    "path": "./ruleset/ios_rule_script/Steam.yaml"
  }
};

// 规则
const rules = [

  // 自定义 强直连
  "PROCESS-NAME,cs2.exe,全局直连", // CS2

  // 自定义 强代理

  // 广告拦截反劫持隐私保护 强拦截
  "RULE-SET,Hijacking,全局拦截",
  "RULE-SET,Privacy,全局拦截",
  "RULE-SET,AdvertisingLite,全局拦截",

  // 本地 强直连
  "RULE-SET,Lan,全局直连",
  "GEOIP,LAN,全局直连",
  "RULE-SET,Direct,全局直连",

  // 特定服务 代理
  "RULE-SET,Download,下载服务",
  "RULE-SET,PrivateTracker,下载服务",
  "RULE-SET,SteamCN,SteamCN",
  "RULE-SET,Steam,Steam",
  "GEOSITE,github,GitHub",
  "GEOSITE,google,谷歌服务",
  "GEOSITE,bing,必应搜索",
  "GEOSITE,microsoft,微软服务",
  "GEOSITE,youtube,YouTube",
  "GEOSITE,telegram,电报消息",
  "GEOSITE,netflix,Netflix",
  "GEOSITE,spotify,Spotify",
  "GEOSITE,tiktok,TikTok",
  "GEOSITE,bahamut,动画疯",
  "GEOSITE,apple-cn,苹果服务-中国",
  "GEOSITE,apple,苹果服务",
  "GEOSITE,twitter,推特消息",
  "GEOSITE,cloudflare,Cloudflare",

  // 中国 强直连
  "GEOSITE,CN,全局直连",
  "GEOIP,CN,全局直连",

  // 通用 代理
  "RULE-SET,Global,节点选择",

  // 兜底
  "MATCH,漏网之鱼"
];

// 过滤节点名称中的关键词：默认仅保留常用地区及城市别名节点，并排除套餐说明、过期提醒、测试/试用等无意义条目
const nodeFilterRegex = "^(?=.*(香港|HK|Hong Kong|HongKong|日本|JP|Japan|东京|大阪|台湾|TW|Taiwan|台北|新加坡|SG|Singapore|狮城|美国|US|United States|USA|洛杉矶))(?!.*(官网|套餐|流量|异常|剩余|到期|过期|说明|提示|测试|试用|客服|工单|反馈|群|TG|订阅|倍率|2x|3x|4x)).*$";

// URL-Test 代理组通用配置
const urlTestGroupBaseOption = {
  "interval": 300,
  "timeout": 3000,
  "url": "https://www.google.com/generate_204",
  "lazy": true,
  "max-failed-times": 3,
  "hidden": false,
  "filter": nodeFilterRegex
};

// Select 代理组通用配置
const selectGroupBaseOption = {
  "hidden": false,
  "filter": nodeFilterRegex
};

// 程序入口
function main(config) {
  if (!config || typeof config !== "object") {
    throw new Error("main(config) 入参无效");
  }

  const proxyCount = config?.proxies?.length ?? 0;
  const proxyProviders = config?.["proxy-providers"];
  const proxyProviderCount =
    proxyProviders && typeof proxyProviders === "object" && !Array.isArray(proxyProviders)
      ? Object.keys(proxyProviders).length
      : 0;
  if (proxyCount === 0 && proxyProviderCount === 0) {
    throw new Error("配置文件中未找到任何代理");
  }

  // 覆盖原配置中 DNS 配置
  config["dns"] = dnsConfig;

  // 注入 Sniffer 配置，解决 Fake-IP 模式下 BT 下载无速度、特定应用报错等问题
  config["sniffer"] = {
    "enable": true,
    "force-dns-mapping": true,
    "parse-pure-ip": true,
    "override-destination": true,
    "sniff": {
      "HTTP": {
        "ports": [80, "8080-8880"],
        "override-destination": true
      },
      "TLS": {
        "ports": [443, 8443]
      },
      "QUIC": {
        "ports": [443, 8443]
      }
    }
  };

  // 覆盖原配置中的代理组
  config["proxy-groups"] = [
    {
      ...urlTestGroupBaseOption,
      "name": "节点选择",
      "type": "url-test",
      "include-all": true,
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
      "sort": ["latency"]
    },
    {
      "name": "SteamCN",
      "type": "select",
      "proxies": ["全局直连", "节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/steam.svg"
    },
    {
      "name": "Steam",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/steam.svg"
    },
    {
      "name": "GitHub",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/github.svg"
    },
    {
      "name": "谷歌服务",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg"
    },
    {
      "name": "必应搜索",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bing.svg"
    },
    {
      "name": "微软服务",
      "type": "select",
      "proxies": ["全局直连", "节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/microsoft.svg"
    },
    {
      "name": "YouTube",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/youtube.svg"
    },
    {
      "name": "电报消息",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg"
    },
    {
      "name": "Netflix",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/netflix.svg"
    },
    {
      "name": "Spotify",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    },
    {
      "name": "TikTok",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/tiktok.svg"
    },
    {
      ...selectGroupBaseOption,
      "name": "动画疯",
      "type": "select",
      "proxies": ["节点选择"],
      "include-all": true,
      "filter": "(?i)台|tw|TW|Taiwan",
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      "name": "苹果服务-中国",
      "type": "select",
      "proxies": ["全局直连", "节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      "name": "苹果服务",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/apple.svg"
    },
    {
      "name": "推特消息",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/twitter.svg"
    },
    {
      "name": "Cloudflare",
      "type": "select",
      "proxies": ["全局直连", "节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/cloudflare.svg"
    },
    {
      "name": "下载服务",
      "type": "select",
      "proxies": ["全局直连", "节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg"
    },
    {
      "name": "全局拦截",
      "type": "select",
      "proxies": ["REJECT"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/bug.svg"
    },
    {
      "name": "全局直连",
      "type": "select",
      "proxies": ["DIRECT", "节点选择"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg"
    },
    {
      "name": "漏网之鱼",
      "type": "select",
      "proxies": ["节点选择", "全局直连"],
      "icon": "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg"
    }
  ];

  // 覆盖原配置中的规则
  config["rule-providers"] = ruleProviders;
  config["rules"] = rules;
  
  // 添加判断
  if (Array.isArray(config["proxies"])) {
    config["proxies"].forEach(proxy => {
      // 为每个节点设置 udp = true
      proxy.udp = true;
    });
  }

  // 返回修改后的配置
  return config;
}
