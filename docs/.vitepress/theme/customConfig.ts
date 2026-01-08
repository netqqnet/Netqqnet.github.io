// 二维码图片资源路径
export const QR_IMAGES = {
  ALAN: '/qrcode/qw_alan.png',
  PP: '/qrcode/qiwei2_pp.png',
  QING: '/qrcode/Qingqw.png',
  JINLI: '/qrcode/qw_jinli.jpg',
};

export interface QrcodeConfig {
  default: string;
  channels: Record<string, string>;
}

export interface CustomConfig {
  qrcode: QrcodeConfig;
  // 未来可以在这里添加其他配置
}

export const customConfig: CustomConfig = {
  qrcode: {
    default: QR_IMAGES.PP,
    channels: {
      // 渠道名(小写): 二维码路径
      'v2ex': QR_IMAGES.JINLI,
      'linuxdo': QR_IMAGES.ALAN,
      '55188': QR_IMAGES.ALAN,
      'tbg': QR_IMAGES.ALAN,
      'iitang': QR_IMAGES.QING,
    }
  }
};
