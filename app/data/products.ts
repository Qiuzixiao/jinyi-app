// 产品数据

export const products = [
  {
    id: 'premium-bolt-series',
    name: '特殊螺母',
    image: '/Img/product-1.svg', // 使用新创建的产品SVG图片
    category: '工业风机系列',
    specs: {
      '材质': '304不锈钢',
      '表面处理': '镀铬',
      '规格': 'M8-M20'
    }
  },
  {
    id: 'premium-bolt-normal',
    name: '一般螺母',
    image: '/Img/螺丝.png', // 使用新创建的产品SVG图片
    category: '工业风机系列',
    specs: {
      '材质': '304不锈钢',
      '表面处理': '镀铬',
      '规格': 'M8-M20'
    }
  },
  {
    id: 'anti-corrosion-fasteners',
    name: '防松系列',
    image: '/Img/product-2.svg',
    category: '新能源充电枪系列',
    specs: {
      '材质': '316L不锈钢',
      '表面处理': '特殊防腐涂层',
      '规格': 'M6-M24'
    }
  },
  {
    id: 'precision-screws',
    name: '精密螺丝系列',
    image: '/Img/product-3.svg',
    category: '电表系列',
    specs: {
      '材质': '钛合金',
      '表面处理': '阳极氧化',
      '规格': 'M3-M12'
    }
  },
  {
    id: 'eco-friendly-fasteners',
    name: '环保紧固件',
    image: '/Img/product-4.svg',
    category: '电磁水阀系列',
    specs: {
      '材质': '可降解复合材料',
      '表面处理': '无',
      '规格': 'M5-M16'
    }
  },
  {
    id: 'luxury-decorative-screws',
    name: '奢华装饰螺丝',
    image: '/Img/carousel-1.svg',
    category: '五金冲压件系列',
    specs: {
      '材质': '黄铜',
      '表面处理': '24K金镀层',
      '规格': 'M4-M10'
    }
  },
  {
    id: 'industrial-strength-bolts',
    name: '工业强力螺栓',
    image: '/Img/carousel-2.svg',
    category: '工业系列',
    specs: {
      '材质': '高强度合金钢',
      '表面处理': '磷化处理',
      '规格': 'M10-M36'
    }
  },



];

// 产品分类
export const categories = [
  '工业风机系列',
  '新能源充电枪系列',
  '电表系列',
  '电磁水阀系列',
];

// 获取单个产品详情
export function getProductById(id: string) {
  return products.find(product => product.id === id);
}

// 获取产品的多角度图片（示例函数）
export function getProductImages(productId: string) {
  // 实际项目中，这里应该从数据库或API获取特定产品的多角度图片
  // 这里为了演示，我们根据产品ID返回对应的多角度图片
  const productImages = {
    'premium-bolt-series': [
      '/Img/product-1.svg',
      '/Img/product-1.svg', // 不同角度的图片，这里重复使用同一张作为示例
      '/Img/product-1.svg',
      '/Img/hero.jpg',
    ],
    'anti-corrosion-fasteners': [
      '/Img/product-2.svg',
      '/Img/product-2.svg', // 不同角度的图片，这里重复使用同一张作为示例
      '/Img/carousel-2.svg',
      '/Img/hero.jpg',
    ],
    'precision-screws': [
      '/Img/product-3.svg',
      '/Img/product-3.svg', // 不同角度的图片，这里重复使用同一张作为示例
      '/Img/carousel-3.svg',
      '/Img/hero.jpg',
    ],
    'eco-friendly-fasteners': [
      '/Img/product-4.svg',
      '/Img/product-4.svg', // 不同角度的图片，这里重复使用同一张作为示例
      '/Img/carousel-1.svg',
      '/Img/hero.jpg',
    ],
    'premium-bolt-normal': [
      '/Img/螺丝.png',
      '/Img/螺丝.png', // 不同角度的图片，这里重复使用同一张作为示例
      '/Img/螺丝.png',
      '/Img/螺丝.png',
    ],
  };
  
  // 如果找不到对应产品的图片，返回默认图片集
  return productImages[productId as keyof typeof productImages] || [
    '/Img/product-1.svg',
    '/Img/product-2.svg',
    '/Img/product-3.svg',
    '/Img/product-4.svg',
  ];
}

// 获取产品详细规格（示例函数）
export function getProductSpecifications(productId: string) {
  const product = getProductById(productId);
  if (!product || !product.specs) return [];
  
  // 将产品规格对象转换为规格数组
  return Object.entries(product.specs).map(([title, value]) => ({
    title,
    value
  }));
}