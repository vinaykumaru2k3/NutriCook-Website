import { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Youtube, CheckCircle, AlertCircle } from 'lucide-react';
import { useAnimatedRef, useFormAnimation, useLoadingAnimation } from '../hooks/useAnimations';
import { trackFormSubmission, trackDemoRequest } from '../utils/analytics';
import { a11y } from '../utils/design-system';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    city: '',
    comments: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  
  // Animation hooks
  const headerRef = useAnimatedRef('fadeInUp', 0);
  const formRef = useAnimatedRef('fadeInLeft', 200);
  const contactInfoRef = useAnimatedRef('fadeInRight', 400);
  const { formRef: formAnimationRef, animateSubmission, animateSuccess, animateError } = useFormAnimation();
  const submitButtonRef = useLoadingAnimation(isSubmitting);

  // Check for success parameter from FormSubmit.co redirect
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('success') === 'true') {
      setSubmitStatus('success');
      animateSuccess();
      a11y.announceToScreenReader('Demo request submitted successfully. We will contact you within 24 hours to schedule your free demonstration.');
      
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  }, []);

  const validateForm = () => {
    const newErrors = {};
    
    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }
    
    // Phone validation
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s+/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit Indian mobile number';
    }
    
    // City validation
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    } else if (formData.city.trim().length < 2) {
      newErrors.city = 'City must be at least 2 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      animateError();
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    animateSubmission(true);
    
    try {
      // Create FormData for FormSubmit.co
      const formDataToSubmit = new FormData();
      formDataToSubmit.append('name', formData.name);
      formDataToSubmit.append('phone', formData.phone);
      formDataToSubmit.append('city', formData.city);
      formDataToSubmit.append('comments', formData.comments || 'No additional comments');
      formDataToSubmit.append('_subject', `New Demo Request from ${formData.name}`);
      formDataToSubmit.append('_captcha', 'false');
      formDataToSubmit.append('_template', 'table');
      
      // Submit to FormSubmit.co
      const response = await fetch('https://formsubmit.co/nutricooksmg@gmail.com', {
        method: 'POST',
        body: formDataToSubmit
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', phone: '', city: '', comments: '' });
        animateSuccess();
        
        // Track successful form submission
        trackFormSubmission('demo_request', true);
        trackDemoRequest({
          name: formData.name,
          phone: formData.phone,
          city: formData.city
        });
        
        a11y.announceToScreenReader('Demo request submitted successfully. We will contact you within 24 hours to schedule your free demonstration.');
        
        // Clear success message after 5 seconds
        setTimeout(() => setSubmitStatus(null), 5000);
      } else {
        throw new Error('Form submission failed');
      }
      
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
      animateError();
      
      // Track failed form submission
      trackFormSubmission('demo_request', false);
      
      a11y.announceToScreenReader('Form submission failed. Please try again or call us directly.');
    } finally {
      setIsSubmitting(false);
      animateSubmission(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={headerRef} className="text-center mb-12 md:mb-16 px-4 md:px-0">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 text-readable">
            Ready to Transform Your Cooking?
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto text-readable-large">
            Request your free home demonstration and experience the NutriCook difference firsthand. 
            Our expert will cook a complete meal at your home using our oilless, waterless technology.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          {/* Contact Form - Mobile Optimized */}
          <div ref={formRef} className="bg-white rounded-2xl shadow-lg p-6 md:p-8 card-mobile card-animated">
            <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 text-readable">Request a FREE Demo</h3>
            
            {submitStatus === 'success' && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
                <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                <div>
                  <p className="text-green-800 font-medium">Demo Request Submitted!</p>
                  <p className="text-green-700 text-sm">We'll contact you within 24 hours to schedule your free demonstration.</p>
                </div>
              </div>
            )}
            
            {submitStatus === 'error' && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0" />
                <div>
                  <p className="text-red-800 font-medium">Submission Failed</p>
                  <p className="text-red-700 text-sm">Please try again or call us directly.</p>
                </div>
              </div>
            )}
            
            <form 
              ref={formAnimationRef} 
              onSubmit={handleSubmit} 
              action="https://formsubmit.co/nutricooksmg@gmail.com"
              method="POST"
              className="space-y-6"
            >
              {/* FormSubmit.co configuration fields */}
              <input type="hidden" name="_subject" value="New Demo Request from NutriCook Website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={window.location.origin + window.location.pathname + "?success=true"} />
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors touch-target text-base input-animated ${
                    errors.name ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors touch-target text-base input-animated ${
                    errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your 10-digit mobile number"
                  inputMode="numeric"
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors touch-target text-base input-animated ${
                    errors.city ? 'border-red-300 bg-red-50' : 'border-gray-300'
                  }`}
                  placeholder="Enter your city"
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label htmlFor="comments" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Comments (Optional)
                </label>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors touch-target text-base resize-vertical input-animated"
                  placeholder="Any specific questions or preferences for your demo?"
                />
              </div>

              <button
                ref={submitButtonRef}
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-4 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2 touch-target min-h-12 text-base btn-animated"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Submitting...
                  </>
                ) : (
                  'Request FREE Demo'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 card-animated">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Phone className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Call Us</h4>
                    <p className="text-gray-600">+91 9448169903</p>
                    <p className="text-sm text-gray-500">Available 9 AM - 8 PM, Mon-Sat</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <Mail className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Email Us</h4>
                    <p className="text-gray-600">nutricooksmg@gmail.com</p>
                    <p className="text-sm text-gray-500">We'll respond within 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-orange-100 p-3 rounded-lg">
                    <MapPin className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Service Areas</h4>
                    <p className="text-gray-600">Kolar, Bangalore, Shivamogga, Mysuru, Chennai</p>
                    <p className="text-sm text-gray-500">Expanding to more cities soon</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Presenter Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8 card-animated">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Your Demo Presenter</h3>
              
              <div className="text-center">
                <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-orange-600">UK</span>
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-2">Mr. Uday Kumar M H</h4>
                <p className="text-gray-600 mb-4">S/o Hucchu Rao</p>
                <p className="text-sm text-gray-500 mb-6">
                  Certified NutriCook specialist with 5+ years of experience in healthy cooking demonstrations. 
                  Passionate about helping families discover the benefits of oil-free, water-free cooking.
                </p>
                
                <div className="flex justify-center gap-4">
                  <a
                    href="#"
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                    aria-label="Facebook"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-pink-600 hover:bg-pink-700 text-white p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                    aria-label="Instagram"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="#"
                    className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                    aria-label="YouTube"
                  >
                    <Youtube className="h-5 w-5" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}