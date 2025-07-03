document.addEventListener('DOMContentLoaded', function() {
    // ROI Calculator functionality
    const monthlyInvoicesInput = document.getElementById('monthly-invoices');
    const averageAmountInput = document.getElementById('average-amount');
    const paymentTermsInput = document.getElementById('payment-terms');
    
    const timeSavedOutput = document.getElementById('time-saved');
    const moneySavedOutput = document.getElementById('money-saved');
    const cashflowImprovementOutput = document.getElementById('cashflow-improvement');
    
    // Update range value displays
    const rangeInputs = document.querySelectorAll('input[type="range"]');
    rangeInputs.forEach(input => {
        const valueDisplay = input.nextElementSibling;
        
        // Set initial value
        if (input.id === 'average-amount') {
            valueDisplay.textContent = formatCurrency(input.value);
        } else {
            valueDisplay.textContent = input.value;
        }
        
        // Update on input change
        input.addEventListener('input', function() {
            if (this.id === 'average-amount') {
                valueDisplay.textContent = formatCurrency(this.value);
            } else {
                valueDisplay.textContent = this.value;
            }
            calculateROI();
        });
    });
    
    // Initial calculation
    calculateROI();
    
    function calculateROI() {
        const monthlyInvoices = parseInt(monthlyInvoicesInput.value);
        const averageAmount = parseInt(averageAmountInput.value);
        const paymentTerms = parseInt(paymentTermsInput.value);
        
        // Calculate time saved (average days reduced from payment terms)
        const timeSaved = Math.round(paymentTerms * 0.85); // Assume 85% reduction in payment time
        timeSavedOutput.textContent = `${timeSaved} days`;
        
        // Calculate money saved (based on typical financing costs)
        const annualInterestRate = 0.15; // 15% annual interest rate
        const dailyInterestRate = annualInterestRate / 365;
        const financingCost = averageAmount * monthlyInvoices * dailyInterestRate * timeSaved;
        moneySavedOutput.textContent = `IDR ${formatNumber(Math.round(financingCost))}`;
        
        // Calculate cash flow improvement percentage
        const cashflowImprovement = Math.round((timeSaved / paymentTerms) * 100);
        cashflowImprovementOutput.textContent = `${cashflowImprovement}%`;
    }
    
    // Format currency
    function formatCurrency(value) {
        return new Intl.NumberFormat('id-ID').format(value);
    }
    
    // Format number with commas
    function formatNumber(number) {
        return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Mobile navigation toggle (for responsive design)
    // This would require adding a mobile menu button in the HTML
    // For now, we'll just add the code structure
    const mobileMenuButton = document.createElement('div');
    mobileMenuButton.className = 'mobile-menu-button';
    mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    // Insert mobile menu button before nav links
    nav.insertBefore(mobileMenuButton, navLinks);
    
    // Add click event to toggle mobile menu
    mobileMenuButton.addEventListener('click', function() {
        navLinks.classList.toggle('show');
    });
    
    // Add mobile menu styles
    const style = document.createElement('style');
    style.textContent = `
        @media (max-width: 768px) {
            .mobile-menu-button {
                display: block;
                font-size: 1.5rem;
                cursor: pointer;
            }
            
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background-color: white;
                flex-direction: column;
                padding: 1rem;
                box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
            }
            
            .nav-links.show {
                display: flex;
            }
        }
        
        @media (min-width: 769px) {
            .mobile-menu-button {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Add scroll animation for elements
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animateElements = document.querySelectorAll('.feature-card, .audience-card, .step, .security-feature, .comparison-row');
    animateElements.forEach(element => {
        observer.observe(element);
    });
    
    // Add animation styles
    const animationStyle = document.createElement('style');
    animationStyle.textContent = `
        .feature-card, .audience-card, .step, .security-feature, .comparison-row {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .feature-card.animate, .audience-card.animate, .step.animate, .security-feature.animate, .comparison-row.animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(animationStyle);
});