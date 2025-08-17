图片文件夹说明

请将你的全景图片放在这个文件夹中，然后在 script.js 文件中更新图片路径。

推荐的图片格式：
- JPG (.jpg, .jpeg)
- PNG (.png)
- WebP (.webp)

推荐的图片尺寸：
- 宽度: 2048像素或更高
- 高度: 1024像素或更高
- 宽高比: 2:1 (全景图片)

图片要求：
1. 左右边缘可以无缝连接（全景图片）
2. 图片质量清晰
3. 文件大小适中（建议不超过5MB）

使用步骤：
1. 将你的全景图片复制到此文件夹
2. 在 script.js 文件中找到 loadPanoramaImage() 函数
3. 将 imageUrl 变量修改为你的图片路径，例如：
   const imageUrl = './images/your-panorama.jpg';

示例：
- 如果你的图片名为 "mountain-view.jpg"
- 则设置：const imageUrl = './images/mountain-view.jpg'; 