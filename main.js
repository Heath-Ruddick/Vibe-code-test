document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip if it's just a placeholder link
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add active class to nav items on scroll
    const sections = document.querySelectorAll('.section');
    const navItems = document.querySelectorAll('nav ul li a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Feature cards hover effect enhancement
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            featureCards.forEach(c => {
                if (c !== card) {
                    c.style.opacity = '0.7';
                }
            });
        });
        
        card.addEventListener('mouseleave', () => {
            featureCards.forEach(c => {
                c.style.opacity = '1';
            });
        });
    });
    
    // Form validation for contact forms (if any)
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            let isValid = true;
            const requiredFields = form.querySelectorAll('[required]');
            
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    field.classList.add('error');
                    
                    // Add error message if it doesn't exist
                    let errorMsg = field.nextElementSibling;
                    if (!errorMsg || !errorMsg.classList.contains('error-message')) {
                        errorMsg = document.createElement('div');
                        errorMsg.classList.add('error-message');
                        errorMsg.textContent = 'This field is required';
                        field.parentNode.insertBefore(errorMsg, field.nextSibling);
                    }
                } else {
                    field.classList.remove('error');
                    
                    // Remove error message if it exists
                    const errorMsg = field.nextElementSibling;
                    if (errorMsg && errorMsg.classList.contains('error-message')) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (isValid) {
                // Show success message
                const successMsg = document.createElement('div');
                successMsg.classList.add('success-message');
                successMsg.textContent = 'Form submitted successfully!';
                form.appendChild(successMsg);
                
                // Reset form
                form.reset();
                
                // Remove success message after 3 seconds
                setTimeout(() => {
                    successMsg.remove();
                }, 3000);
            }
        });
    });
    
    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
    }
    
    // Add "Coming Soon" notification for placeholder links
    const placeholderLinks = document.querySelectorAll('a[href="#"]');
    
    placeholderLinks.forEach(link => {
        if (!link.classList.contains('btn')) { // Don't apply to main CTA buttons
            link.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Show notification
                showNotification('This feature is coming soon!');
            });
        }
    });
    
    // Notification function
    function showNotification(message) {
        // Remove any existing notification
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;
        
        // Style the notification
        notification.style.position = 'fixed';
        notification.style.top = '100px';
        notification.style.right = '20px';
        notification.style.backgroundColor = 'var(--secondary-color)';
        notification.style.color = 'white';
        notification.style.padding = '15px 20px';
        notification.style.borderRadius = '4px';
        notification.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.1)';
        notification.style.zIndex = '1000';
        notification.style.opacity = '0';
        notification.style.transform = 'translateY(-20px)';
        notification.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.style.opacity = '1';
            notification.style.transform = 'translateY(0)';
        }, 10);
        
        // Auto-remove after 3 seconds
        setTimeout(() => {
            notification.style.opacity = '0';
            notification.style.transform = 'translateY(-20px)';
            
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }
    
    // Add animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        setTimeout(() => {
            heroContent.style.opacity = '0';
            heroContent.style.transform = 'translateY(20px)';
            heroContent.style.transition = 'opacity 1s ease, transform 1s ease';
            
            setTimeout(() => {
                heroContent.style.opacity = '1';
                heroContent.style.transform = 'translateY(0)';
            }, 100);
        }, 100);
    }
    
    // Protein Calculator Functionality
    window.calculateProtein = function() {
        const weight = parseFloat(document.getElementById('weight').value);
        const weightUnit = document.getElementById('weightUnit').value;
        const activityLevel = parseFloat(document.getElementById('activityLevel').value);
        const goal = document.getElementById('goal').value;
        
        if (!weight || weight <= 0) {
            showNotification('Please enter a valid weight');
            return;
        }
        
        // Convert weight to kg if needed
        const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
        
        // Base protein calculations (in g/kg of body weight)
        let proteinMultipliers = {
            min: 1.6,
            optimal: 2.0,
            max: 2.4
        };
        
        // Adjust multipliers based on activity level and goal
        if (activityLevel >= 1.725) { // Heavy exercise or professional athlete
            proteinMultipliers.min += 0.2;
            proteinMultipliers.optimal += 0.2;
            proteinMultipliers.max += 0.2;
        }
        
        // Adjust based on goal
        switch(goal) {
            case 'build':
                proteinMultipliers.min += 0.2;
                proteinMultipliers.optimal += 0.3;
                proteinMultipliers.max += 0.4;
                break;
            case 'cut':
                proteinMultipliers.min += 0.3;
                proteinMultipliers.optimal += 0.4;
                proteinMultipliers.max += 0.5;
                break;
        }
        
        // Calculate protein needs
        const minProtein = Math.round(weightInKg * proteinMultipliers.min);
        const optimalProtein = Math.round(weightInKg * proteinMultipliers.optimal);
        const maxProtein = Math.round(weightInKg * proteinMultipliers.max);
        
        // Update the UI
        document.getElementById('minProtein').textContent = minProtein;
        document.getElementById('optimalProtein').textContent = optimalProtein;
        document.getElementById('maxProtein').textContent = maxProtein;
        
        // Show results
        const resultElement = document.getElementById('proteinResult');
        resultElement.style.display = 'block';
        
        // Smooth scroll to results
        resultElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Add animation to results
        resultElement.style.opacity = '0';
        resultElement.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            resultElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            resultElement.style.opacity = '1';
            resultElement.style.transform = 'translateY(0)';
        }, 100);
        
        // Show success notification
        showNotification('Protein needs calculated successfully!');
    };
    
    // Fix input validation for weight - only check for minimum value
    const weightInput = document.getElementById('weight');
    if (weightInput) {
        // Remove any existing event listeners
        const newWeightInput = weightInput.cloneNode(true);
        weightInput.parentNode.replaceChild(newWeightInput, weightInput);
        
        // Add new event listener that only checks for minimum value
        newWeightInput.addEventListener('input', function() {
            const value = parseFloat(this.value);
            if (value < 30 && value !== '' && !isNaN(value)) {
                showNotification('Minimum weight value is 30');
                // Don't force the value to change, just notify
            }
        });
        
        // Ensure numeric input works properly
        newWeightInput.addEventListener('keydown', function(e) {
            // Allow: backspace, delete, tab, escape, enter, decimal point, and numbers
            if ([46, 8, 9, 27, 13, 110, 190].indexOf(e.keyCode) !== -1 ||
                // Allow: Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
                (e.keyCode === 65 && e.ctrlKey === true) ||
                (e.keyCode === 67 && e.ctrlKey === true) ||
                (e.keyCode === 86 && e.ctrlKey === true) ||
                (e.keyCode === 88 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39) ||
                // Allow numbers and keypad numbers
                ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105))) {
                // let it happen, don't do anything
                return;
            }
            // Prevent the default action if it's not a number
            e.preventDefault();
        });
    }
    
    // Add smooth scrolling to protein calculator section
    const proteinLink = document.getElementById('protein-calculator-link');
    if (proteinLink) {
        proteinLink.addEventListener('click', function(e) {
            e.preventDefault();
            const proteinSection = document.getElementById('protein-calculator');
            if (proteinSection) {
                proteinSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                
                // Add a subtle highlight effect
                proteinSection.style.transition = 'background-color 0.5s ease';
                const originalColor = getComputedStyle(proteinSection).backgroundColor;
                proteinSection.style.backgroundColor = 'rgba(0, 102, 204, 0.1)';
                
                setTimeout(() => {
                    proteinSection.style.backgroundColor = originalColor;
                }, 1000);
                
                // Focus on the weight input
                setTimeout(() => {
                    const weightInput = document.getElementById('weight');
                    if (weightInput) {
                        weightInput.focus();
                    }
                }, 800);
            }
        });
    }
}); 