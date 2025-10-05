/**
 * TideMaster Modal JavaScript
 * 负责处理网站中的模态框功能
 */

document.addEventListener('DOMContentLoaded', function() {
    // 通用模态框处理
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                openModal(modal);
            }
        });
    });
    
    // 关闭按钮
    document.querySelectorAll('.modal-close').forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            closeModal(modal);
        });
    });
    
    // 点击模态框背景关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeModal(this);
            }
        });
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            const activeModal = document.querySelector('.modal.active');
            if (activeModal) {
                closeModal(activeModal);
            }
        }
    });
    
    /**
     * 打开模态框
     * @param {HTMLElement} modal - 要打开的模态框元素
     */
    function openModal(modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden'; // 防止背景滚动
        
        // 触发自定义事件
        modal.dispatchEvent(new CustomEvent('modal:open'));
    }
    
    /**
     * 关闭模态框
     * @param {HTMLElement} modal - 要关闭的模态框元素
     */
    function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
        
        // 触发自定义事件
        modal.dispatchEvent(new CustomEvent('modal:close'));
    }
    
    // 图片查看器模态框
    const galleryItems = document.querySelectorAll('.gallery-item');
    const imageViewer = document.getElementById('imageViewer');
    
    if (galleryItems.length > 0 && imageViewer) {
        const viewerImage = imageViewer.querySelector('.viewer-image img');
        const viewerCaption = imageViewer.querySelector('.viewer-caption');
        
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imageSrc = this.getAttribute('data-image') || this.querySelector('img').src;
                const caption = this.getAttribute('data-caption') || '';
                
                if (viewerImage && imageSrc) {
                    viewerImage.src = imageSrc;
                    if (viewerCaption) {
                        viewerCaption.textContent = caption;
                    }
                    
                    openModal(imageViewer);
                }
            });
        });
    }
    
    // 视频播放器模态框
    const videoTriggers = document.querySelectorAll('[data-video]');
    const videoPlayer = document.getElementById('videoPlayer');
    
    if (videoTriggers.length > 0 && videoPlayer) {
        const videoFrame = videoPlayer.querySelector('.video-frame');
        
        videoTriggers.forEach(trigger => {
            trigger.addEventListener('click', function(e) {
                e.preventDefault();
                
                const videoUrl = this.getAttribute('data-video');
                
                if (videoFrame && videoUrl) {
                    // 设置iframe的src属性（Youtube或Vimeo等）
                    videoFrame.src = videoUrl;
                    
                    openModal(videoPlayer);
                    
                    // 在模态框关闭时停止视频
                    videoPlayer.addEventListener('modal:close', function() {
                        videoFrame.src = '';
                    }, { once: true });
                }
            });
        });
    }
    
    // 快速查看产品模态框
    const quickviewButtons = document.querySelectorAll('.quickview-btn');
    const quickviewModal = document.getElementById('quickviewModal');
    
    if (quickviewButtons.length > 0 && quickviewModal) {
        const quickviewContent = quickviewModal.querySelector('.quickview-content');
        
        quickviewButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const productId = this.getAttribute('data-product');
                
                if (productId) {
                    // 这里可以使用AJAX请求获取产品信息，或者从预先加载的数据中获取
                    fetchProductDetails(productId)
                        .then(productData => {
                            // 填充模态框内容
                            updateQuickviewContent(quickviewContent, productData);
                            
                            // 打开模态框
                            openModal(quickviewModal);
                        })
                        .catch(error => {
                            console.error('Error loading product details:', error);
                        });
                }
            });
        });
        
        // 假设的产品信息获取函数（在实际应用中可能是AJAX请求）
        function fetchProductDetails(productId) {
            // 这里是示例，实际应用中应该从服务器获取数据
            return new Promise((resolve, reject) => {
                // 模拟网络请求
                setTimeout(() => {
                    // 假设的产品数据
                    const productData = {
                        id: productId,
                        name: 'Product ' + productId,
                        price: '$' + (Math.floor(Math.random() * 900) + 100) + ',000',
                        description: 'This is a sample product description for the quickview modal.',
                        features: ['Feature 1', 'Feature 2', 'Feature 3'],
                        images: [
                            'assets/images/products/sample/product1.jpg',
                            'assets/images/products/sample/product2.jpg'
                        ]
                    };
                    
                    resolve(productData);
                }, 300);
            });
        }
        
        // 更新快速查看内容
        function updateQuickviewContent(container, productData) {
            if (!container || !productData) return;
            
            // 构建HTML内容
            let html = `
                <div class="quickview-grid">
                    <div class="quickview-images">
                        <div class="main-image
