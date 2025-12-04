-- 1. 券商基础信息表
CREATE TABLE `broker` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '券商ID',
  `broker_code` VARCHAR(10) NOT NULL UNIQUE COMMENT '券商代号',
  `broker_name` VARCHAR(50) NOT NULL COMMENT '券商名称',
  `support_ths` ENUM('仅手机','仅电脑','手机+电脑','不支持') DEFAULT '不支持' COMMENT '同花顺支持情况',
  `support_tdx` ENUM('仅手机','仅电脑','手机+电脑','不支持') DEFAULT '不支持' COMMENT '通达信支持情况',
  `support_xq` ENUM('仅手机','仅电脑','手机+电脑','不支持') DEFAULT '不支持' COMMENT '雪球支持情况',
  `support_dzh` ENUM('仅手机','仅电脑','手机+电脑','不支持') DEFAULT '不支持' COMMENT '大智慧支持情况',
  `support_zxg` ENUM('仅手机','仅电脑','手机+电脑','不支持') DEFAULT '不支持' COMMENT '自选股支持情况',
  `is_listed` TINYINT(1) DEFAULT 0 COMMENT '是否上市',
  `market_value` DECIMAL(20,2) DEFAULT NULL COMMENT '市值',
  `company_type` ENUM('国企','民企','合资') DEFAULT NULL COMMENT '公司性质',
  `official_url` VARCHAR(200) DEFAULT '' COMMENT '官方地址',
  `app_name` VARCHAR(50) DEFAULT '' COMMENT 'APP名称',
  `company_intro` TEXT COMMENT '公司介绍(markdown格式)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='券商基础信息表';

-- 2. 商品表
CREATE TABLE `product` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '商品ID',
  `broker_id` INT NOT NULL COMMENT '券商ID(关联券商基础信息表)',
  `branch` VARCHAR(100) DEFAULT '' COMMENT '营业部',
  `account_manager` VARCHAR(50) DEFAULT '' COMMENT '客户经理',
  `status` ENUM('上架','下架') DEFAULT '上架' COMMENT '上架状态',
  `price` DECIMAL(10,2) DEFAULT 0.00 COMMENT '价格',
  `settlement_rule` VARCHAR(200) DEFAULT '' COMMENT '结算规则',
  `recommendation` VARCHAR(100) DEFAULT '' COMMENT '一句话介绍(推荐语)',
  `deposit_threshold` VARCHAR(20) DEFAULT '' COMMENT '入金门槛',
  `stock_rate` VARCHAR(20) DEFAULT '' COMMENT '股票费率',
  `stock_min_charge` VARCHAR(20) DEFAULT '' COMMENT '股票起收说明',
  `transfer_fee` VARCHAR(20) DEFAULT '' COMMENT '过户费',
  `etf_rate` VARCHAR(20) DEFAULT '' COMMENT 'ETF费率',
  `etf_min_charge` VARCHAR(20) DEFAULT '' COMMENT 'ETF起收说明',
  `convertible_bond_rate` VARCHAR(20) DEFAULT '' COMMENT '可转债费率',
  `convertible_bond_min_charge` VARCHAR(20) DEFAULT '' COMMENT '可转债起收说明',
  `hk_stock_connect_rate` VARCHAR(20) DEFAULT '' COMMENT '港股通费率',
  `hk_stock_connect_min_charge` VARCHAR(20) DEFAULT '' COMMENT '港股通起收说明',
  `north_exchange_rate` VARCHAR(20) DEFAULT '' COMMENT '北交所费率',
  `north_exchange_min_charge` VARCHAR(20) DEFAULT '' COMMENT '北交所起收说明',
  `option_rate` VARCHAR(20) DEFAULT '' COMMENT '期权费率',
  `option_min_charge` VARCHAR(20) DEFAULT '' COMMENT '期权起收说明',
  `margin_trading` VARCHAR(50) DEFAULT '' COMMENT '两融',
  `permanent_requirement` TEXT DEFAULT '' COMMENT '永久达标要求',
  `is_recommend` TINYINT(1) DEFAULT 0 COMMENT '是否推荐',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`broker_id`) REFERENCES `broker`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='商品表';

-- 3. 订单表
CREATE TABLE `order` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '订单ID',
  `customer_name` VARCHAR(50) NOT NULL COMMENT '客户姓名',
  `customer_phone` VARCHAR(20) NOT NULL COMMENT '客户手机',
  `customer_no` VARCHAR(50) DEFAULT '' COMMENT '客户号',
  `status` ENUM('待报单','待确认有效户','1st结算完成','归档','异常') DEFAULT '待报单' COMMENT '状态',
  `product_id` INT NOT NULL COMMENT '商品ID(关联商品表)',
  `creator_userid` INT NOT NULL COMMENT '创建人userid',
  `downstream` VARCHAR(10) DEFAULT '本人' COMMENT '下游(默认本人，可选A/B/..)',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间',
  FOREIGN KEY (`product_id`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单表';

-- 4. 订单备注表
CREATE TABLE `order_remark` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '备注ID',
  `order_id` INT NOT NULL COMMENT '订单ID(关联订单表)',
  `remark_content` TEXT NOT NULL COMMENT '备注内容',
  `creator_userid` INT NOT NULL COMMENT '创建人userid',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  FOREIGN KEY (`order_id`) REFERENCES `order`(`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='订单备注表';

-- 5. 结算记录表
CREATE TABLE `settlement_record` (
  `id` INT AUTO_INCREMENT PRIMARY KEY COMMENT '结算记录ID',
  `occur_time` TIMESTAMP NOT NULL COMMENT '发生时间',
  `counterparty` VARCHAR(50) NOT NULL COMMENT '收款/付款方',
  `direction` ENUM('收','付') NOT NULL COMMENT '方向',
  `amount` DECIMAL(15,2) NOT NULL COMMENT '金额',
  `exec_status` ENUM('已付','待付') DEFAULT '待付' COMMENT '执行状态',
  `remark` VARCHAR(200) DEFAULT '' COMMENT '备注',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='结算记录表';

-- 创建索引
CREATE INDEX `idx_broker_code` ON `broker`(`broker_code`);
CREATE INDEX `idx_broker_name` ON `broker`(`broker_name`);
CREATE INDEX `idx_product_broker_id` ON `product`(`broker_id`);
CREATE INDEX `idx_product_status` ON `product`(`status`);
CREATE INDEX `idx_order_customer_phone` ON `order`(`customer_phone`);
CREATE INDEX `idx_order_status` ON `order`(`status`);
CREATE INDEX `idx_order_product_id` ON `order`(`product_id`);
CREATE INDEX `idx_order_remark_order_id` ON `order_remark`(`order_id`);
CREATE INDEX `idx_settlement_occur_time` ON `settlement_record`(`occur_time`);
CREATE INDEX `idx_settlement_counterparty` ON `settlement_record`(`counterparty`);
CREATE INDEX `idx_settlement_direction` ON `settlement_record`(`direction`);
CREATE INDEX `idx_settlement_exec_status` ON `settlement_record`(`exec_status`);