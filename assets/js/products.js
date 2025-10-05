/**
 * TideMaster Products Page JavaScript
 */

document.addEventListener('DOMContentLoaded', function() {
    // 产品筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const productItems = document.querySelectorAll('.product-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 更新活动按钮
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            productItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    
                    // 添加动画效果
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 产品详情模态框
    const modal = document.getElementById('productModal');
    const modalContent = modal.querySelector('.modal-body');
    const openButtons = document.querySelectorAll('.open-modal');
    const closeButton = modal.querySelector('.modal-close');
    
    // 产品数据 (在实际项目中可能是从API获取)
    const productData = {
        'ninja-18': {
            name: 'TideMaster Ninja 18',
            price: '$85,000',
            description: 'The TideMaster Ninja 18 is our flagship performance boat, designed for those who demand the ultimate in speed, handling, and technology. With its sleek, stealthy design and cutting-edge features, the Ninja 18 delivers an unmatched boating experience.',
            features: [
                'Advanced deep-V hull design with 22° deadrise',
                'Twin Mercury Verado outboard engines (up to 800 HP total)',
                'Military-grade aluminum construction',
                'Carbon fiber reinforced components',
                'AI-powered navigation and fishing systems',
                'Integrated touchscreen control center',
                'Premium shock-absorbing seats',
                'LED lighting package',
                'Custom paint options available'
            ],
            specs: {
                'Length Overall': '18ft (5.5m)',
                'Beam': '7.5ft (2.3m)',
                'Draft': '1.2ft (0.35m)',
                'Weight': '1,950 lbs (885 kg)',
                'Fuel Capacity': '70 gallons (265 liters)',
                'Max Speed': '65+ knots',
                'Seating Capacity': '6 persons',
                'Hull Material': '5083-H116 Aluminum alloy'
            },
            images: [
                'assets/images/products/ninja-18ft/main.jpg',
                'assets/images/products/ninja-18ft/side-view.jpg',
                'assets/images/products/ninja-18ft/console.jpg',
                'assets/images/products/ninja-18ft/rear.jpg'
            ]
        },
        'hunter-28': {
            name: 'TideMaster Hunter 28',
            price: '$120,000',
            description: 'The TideMaster Hunter 28 is a professional-grade fishing boat designed for serious anglers. Combining stability, storage, and cutting-edge fish-finding technology, the Hunter 28 is the ultimate platform for offshore fishing adventures.',
            features: [
                'Stable, wave-cutting hull design',
                'Twin outboard engines (up to 600 HP total)',
                'Massive 50-gallon live well system',
                'Integrated fish boxes with macerator pumps',
                'Advanced sonar and fish-finding systems',
                'Rod storage for up to 20 rods',
                'Spacious fishing deck with non-slip surface',
                'Fresh and raw water washdown systems',
                'Optional tower with second control station'
            ],
            specs: {
                'Length Overall': '28ft (8.5m)',
                'Beam': '9.5ft (2.9m)',
                'Draft': '1.5ft (0.46m)',
                'Weight': '4,500 lbs (2,041 kg)',
                'Fuel Capacity': '200 gallons (757 liters)',
                'Max Speed': '45+ knots',
                'Seating Capacity': '10 persons',
                'Hull Material': '5083-H116 Aluminum alloy'
            },
            images: [
                'assets/images/products/hunter-28ft/main.jpg',
                'assets/images/products/hunter-28ft/side-view.jpg',
                'assets/images/products/hunter-28ft/console.jpg',
                'assets/images/products/hunter-28ft/fishing-deck.jpg'
            ]
        },
        'cat-38': {
            name: 'TideMaster Cat 38',
            price: '$210,000',
            description: 'The TideMaster Cat 38 is a spacious, stable catamaran designed for family cruising, entertaining, and extended trips. With its generous living space, comfortable accommodations, and smooth ride, the Cat 38 offers the perfect balance of luxury and performance.',
            features: [
                'Twin hull catamaran design for maximum stability',
                'Twin outboard engines (up to 700 HP total)',
                'Spacious main cabin with panoramic windows',
                'Full galley with refrigerator, stove, and sink',
                'Sleeping accommodations for up to 6',
                'Marine head with shower',
                'Large sun deck with comfortable seating',
                'Advanced entertainment system',
                'Generator and air conditioning available'
            ],
            specs: {
                'Length Overall': '38ft (11.6m)',
                'Beam': '12.5ft (3.8m)',
                'Draft': '1.8ft (0.55m)',
                'Weight': '9,800 lbs (4,445 kg)',
                'Fuel Capacity': '300 gallons (1,136 liters)',
                'Water Capacity': '100 gallons (378 liters)',
                'Max Speed': '40+ knots',
                'Seating Capacity': '12 persons',
                'Hull Material': '5083-H116 Aluminum alloy'
            },
            images: [
                'assets/images/products/cat-38ft/main.jpg',
                'assets/images/products/cat-38ft/side-view.jpg',
                'assets/images/products/cat-38ft/interior.jpg',
                'assets/images/products/cat-38ft/cabin.jpg'
            ]
        },
        'lounge-38': {
            name: 'TideMaster Lounge 38',
            price: '$240,000',
            description: 'The TideMaster Lounge 38 is designed for the ultimate in on-water entertainment and relaxation. With expansive seating areas, premium entertainment features, and luxurious finishes, the Lounge 38 is the perfect vessel for day cruising and entertaining in style.',
            features: [
                'Spacious open layout with seating for 15+',
                'Twin outboard engines (up to 600 HP total)',
                'Premium sound system with multiple zones',
                'Full wet bar with refrigerator and ice maker',
                'Luxurious lounge seating with premium upholstery',
                'Enclosed head compartment',
                'Extended swim platform',
                'Premium lighting package',
                'Retractable awning for shade'
            ],
            specs: {
                'Length Overall': '38ft (11.6m)',
                'Beam': '10.5ft (3.2m)',
                'Draft': '1.6ft (0.48m)',
                'Weight': '8,500 lbs (3,855 kg)',
                'Fuel Capacity': '250 gallons (946 liters)',
                'Water Capacity': '80 gallons (303 liters)',
                'Max Speed': '35+ knots',
                'Seating Capacity': '15 persons',
                'Hull Material': '5083-H116 Aluminum alloy'
            },
            images: [
                'assets/images/products/Lounge-28ft/main.jpg',
                'assets/images/products/Lounge-28ft/side-view.jpg',
                'assets/images/products/Lounge-28ft/seating.jpg',
                'assets/images/products/Lounge-28ft/bar.jpg'
            ]
        },
        'big-cat-60': {
            name: 'TideMaster Big Cat 60',
            price: '$450,000',
            description: 'The TideMaster Big Cat 60 is our premium flagship vessel, offering the ultimate in luxury, space, and performance. Designed for extended voyages and comfortable living aboard, the Big Cat 60 combines exceptional engineering with luxurious amenities.',
            features: [
                'Massive twin hull design for maximum stability and space',
                'Twin diesel inboard engines (up to 900 HP total)',
                'Three private cabins with en-suite facilities',
                'Full-size galley with premium appliances',
                'Spacious salon with panoramic windows',
                'Flybridge with secondary helm station',
                'Extended range fuel system',
                'Advanced navigation and entertainment systems',
                'Optional solar power system'
            ],
            specs: {
                'Length Overall': '60ft (18.3m)',
                'Beam': '18ft (5.5m)',
                'Draft': '2.5ft (0.76m)',
                'Weight': '22,000 lbs (9,979 kg)',
                'Fuel Capacity': '800 gallons (3,028 liters)',
                'Water Capacity': '300 gallons (1,136 liters)',
                'Max Speed': '30+ knots',
                'Sleeping Capacity': '8 persons',
                'Hull Material': '5083-H116 Aluminum alloy'
            },
            images: [
                'assets/images/products/big cat-60ft/main.jpg',
                'assets/images/products/big cat-60ft/side-view.jpg',
                'assets/images/products/big cat-60ft/interior.jpg',
                'assets/images/products/big cat-60ft/cabin.jpg'
            ]
        }
    };
    
    // 打开模态框
    openButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-product');
            const product = productData[productId];
            
            if (product) {
                // 填充模态框内容
                let modalHtml = `
                    <div class="product-detail">
                        <div class="product-detail-images">
                            <div class="product-main-image">
                                <img src="${product.images[0]}" alt="${product.name}">
                            </div>
                            <div class="product-thumbnails">
                `;
                
                // 添加缩略图
                product.images.forEach((image, index) => {
                    modalHtml += `
                        <div class="product-thumbnail ${index === 0 ? 'active' : ''}" data-image="${image}">
                            <img src="${image}" alt="${product.name} Image ${index + 1}">
                        </div>
                    `;
                });
                
                modalHtml += `
                            </div>
                        </div>
                        <div class="product-detail-info">
                            <h2>${product.name}</h2>
                            <div class="product-price-lg">${product.price}</div>
                            <div class="product-description">
                                <p>${product.description}</p>
                            </div>
                            <div class="product-features">
                                <h3>Key Features</h3>
                                <ul class="feature-list">
                `;
                
                // 添加特点
                product.features.forEach(feature => {
                    modalHtml += `<li>${feature}</li>`;
                });
                
                modalHtml += `
                                </ul>
                            </div>
                            <div class="product-actions-lg">
                                <a href="contact.html?product=${productId}" class="btn btn-primary">Request a Quote</a>
                                <a href="contact.html" class="btn btn-secondary">Contact Sales</a>
                            </div>
                            
                            <div class="product-tabs">
                                <div class="tab-buttons">
                                    <button class="tab-btn active" data-tab="specs">Specifications</button>
                                    <button class="tab-btn" data-tab="options">Options</button>
                                    <button class="tab-btn" data-tab="warranty">Warranty</button>
                                </div>
                                
                                <div class="tab-content active" data-tab="specs">
                                    <table class="specs-table">
                `;
                
                // 添加规格表
                for (const [key, value] of Object.entries(product.specs)) {
                    modalHtml += `
                        <tr>
                            <th>${key}</th>
                            <td>${value}</td>
                        </tr>
                    `;
                }
                
                modalHtml += `
                                    </table>
                                </div>
                                
                                <div class="tab-content" data-tab="options">
                                    <h3>Available Options</h3>
                                    <ul class="feature-list">
                                        <li>Custom paint colors and graphics</li>
                                        <li>Upgraded electronics package</li>
                                        <li>Premium audio system</li>
                                        <li>Additional seating options</li>
                                        <li>Enhanced lighting package</li>
                                        <li>Extended warranty coverage</li>
                                    </ul>
                                </div>
                                
                                <div class="tab-content" data-tab="warranty">
                                    <h3>Warranty Information</h3>
                                    <p>All TideMaster boats come with a standard warranty package:</p>
                                    <ul class="feature-list">
                                        <li>5-year structural warranty on hull and deck</li>
                                        <li>3-year warranty on components and systems</li>
                                        <li>1-year warranty on electronics and accessories</li>
                                        <li>Transferable to a second owner</li>
                                        <li>Extended warranty options available</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                // 填充并显示模态框
                modalContent.innerHTML = modalHtml;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden'; // 防止背景滚动
                
                // 缩略图点击事件
                const thumbnails = modalContent.querySelectorAll('.product-thumbnail');
                const mainImage = modalContent.querySelector('.product-main-image img');
                
                thumbnails.forEach(thumb => {
                    thumb.addEventListener('click', function() {
                        // 更新主图
                        mainImage.src = this.getAttribute('data-image');
                        
                        // 更新激活状态
                        thumbnails.forEach(t => t.classList.remove('active'));
                        this.classList.add('active');
                    });
                });
                
                // 标签页切换
                const tabButtons = modalContent.querySelectorAll('.tab-btn');
                const tabContents = modalContent.querySelectorAll('.tab-content');
                
                tabButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        const tabId = this.getAttribute('data-tab');
                        
                        // 更新按钮激活状态
                        tabButtons.forEach(btn => btn.classList.remove('active'));
                        this.classList.add('active');
                        
                        // 更新内容显示
                        tabContents.forEach(content => {
                            if (content.getAttribute('data-tab') === tabId) {
                                content.classList.add('active');
                            } else {
                                content.classList.remove('active');
                            }
                        });
                    });
                });
            }
        });
    });
    
    // 关闭模态框
    closeButton.addEventListener('click', function() {
        modal.classList.remove('active');
        document.body.style.overflow = ''; // 恢复背景滚动
    });
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
