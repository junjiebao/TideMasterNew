/**
 * TideMaster Website Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // 导航栏滚动效果
    const header = document.querySelector('.main-header');
    const scrollThreshold = 100;

    function handleScroll() {
        if (window.scrollY > scrollThreshold) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    window.addEventListener('scroll', handleScroll);

    // 移动端菜单切换
    const menuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            mainNav.classList.toggle('active');
            this.classList.toggle('active');
        });
    }

    // 搜索框切换
    const searchToggle = document.querySelector('.search-toggle');
    
    if (searchToggle) {
        searchToggle.addEventListener('click', function() {
            // 创建搜索弹出框
            const searchModal = document.createElement('div');
            searchModal.className = 'search-modal';
            searchModal.innerHTML = `
                <div class="search-container">
                    <form class="search-form">
                        <input type="text" placeholder="Search..." autofocus>
                        <button type="submit"><i class="fas fa-search"></i></button>
                    </form>
                    <button class="close-search"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            document.body.appendChild(searchModal);
            document.body.classList.add('search-active');
            
            // 关闭搜索
            searchModal.querySelector('.close-search').addEventListener('click', function() {
                document.body.removeChild(searchModal);
                document.body.classList.remove('search-active');
            });
        });
    }

    // 语言切换
    const langSelector = document.querySelector('.language-selector');
    
    if (langSelector) {
        langSelector.addEventListener('change', function() {
            const selectedLang = this.value;
            // 这里可以添加语言切换的逻辑
            console.log(`Language changed to: ${selectedLang}`);
        });
    }

    // 轮播图功能 (如果页面有轮播图)
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        let currentSlide = 0;
        const slides = slider.querySelectorAll('.slide');
        const totalSlides = slides.length;
        const dotsContainer = slider.querySelector('.slider-dots');
        
        // 创建导航点
        if (dotsContainer && totalSlides > 1) {
            for (let i = 0; i < totalSlides; i++) {
                const dot = document.createElement('span');
                dot.className = 'slider-dot';
                if (i === 0) dot.classList.add('active');
                dot.dataset.slide = i;
                dotsContainer.appendChild(dot);
                
                dot.addEventListener('click', function() {
                    goToSlide(parseInt(this.dataset.slide));
                });
            }
        }
        
        // 如果有多个幻灯片，添加自动播放
        if (totalSlides > 1) {
            // 添加导航按钮
            const prevBtn = slider.querySelector('.slider-prev');
            const nextBtn = slider.querySelector('.slider-next');
            
            if (prevBtn) {
                prevBtn.addEventListener('click', function() {
                    goToSlide(currentSlide - 1);
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', function() {
                    goToSlide(currentSlide + 1);
                });
            }
            
            // 自动播放
            let slideInterval = setInterval(nextSlide, 5000);
            
            // 鼠标悬停时暂停
            slider.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            slider.addEventListener('mouseleave', function() {
                slideInterval = setInterval(nextSlide, 5000);
            });
        }
        
        function goToSlide(index) {
            if (index < 0) {
                index = totalSlides - 1;
            } else if (index >= totalSlides) {
                index = 0;
            }
            
            // 更新幻灯片位置
            slider.querySelector('.slider-track').style.transform = `translateX(-${index * 100}%)`;
            
            // 更新导航点
            const dots = slider.querySelectorAll('.slider-dot');
            dots.forEach(dot => dot.classList.remove('active'));
            if (dots[index]) dots[index].classList.add('active');
            
            currentSlide = index;
        }
        
        function nextSlide() {
            goToSlide(currentSlide + 1);
        }
    });

    // 表单验证
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const requiredFields = form.querySelectorAll('[required]');
            let isValid = true;
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                } else {
                    field.classList.remove('error');
                }
                
                // 电子邮件验证
                if (field.type === 'email' && field.value.trim()) {
                    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                    if (!emailRegex.test(field.value.trim())) {
                        isValid = false;
                        field.classList.add('error');
                    }
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                alert('Please fill in all required fields correctly.');
            }
        });
    });

    // 图片懒加载
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => imageObserver.observe(img));
    } else {
        // 回退到传统的懒加载
        let lazyLoadThrottleTimeout;
        
        function lazyLoad() {
            if (lazyLoadThrottleTimeout) {
                clearTimeout(lazyLoadThrottleTimeout);
            }
            
            lazyLoadThrottleTimeout = setTimeout(() => {
                const scrollTop = window.pageYOffset;
                
                lazyImages.forEach(img => {
                    if (img.offsetTop < window.innerHeight + scrollTop) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                });
                
                if (lazyImages.length === 0) {
                    document.removeEventListener('scroll', lazyLoad);
                    window.removeEventListener('resize', lazyLoad);
                    window.removeEventListener('orientationChange', lazyLoad);
                }
            }, 20);
        }
        
        document.addEventListener('scroll', lazyLoad);
        window.addEventListener('resize', lazyLoad);
        window.addEventListener('orientationChange', lazyLoad);
    }

    // 平滑滚动到锚点
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            
            if (targetId !== '#') {
                e.preventDefault();
                
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
