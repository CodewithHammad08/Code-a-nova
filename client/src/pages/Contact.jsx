import React, { useState, useEffect } from 'react';
import {
  Mail,
  Send,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import { contactService } from '../services/contact.service';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [contactInfo, setContactInfo] = useState({
    contactEmail: 'contact@codeanova.org',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    contactService
      .getContactInfo()
      .then((res) => {
        if (res?.data?.contactEmail) {
          setContactInfo(res.data);
        }
      })
      .catch(() => {});
  }, []);

  const validate = () => {
    const errs = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = 'Please provide a valid name (at least 2 characters)';
    }
    if (!formData.email.trim() || !/^\S+@\S+\.\S+$/.test(formData.email.trim())) {
      errs.email = 'Please provide a valid email address';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await contactService.submitContact(formData);
      setIsSubmitted(true);
      toast.success('Your message has been dispatched to the organizing committee.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to submit inquiry. Please try again.';
      toast.error(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 text-slate-900">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
        {/* Left info column */}
        <div className="md:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-full shadow-xs">
              <img src="/logo.png" alt="Code-a-Nova Logo" className="w-4 h-4 rounded-md object-contain" />
              <span className="text-xs font-semibold tracking-wider uppercase text-slate-700 font-mono">
                Organizing Secretariat
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight font-display">
              Get in Touch
            </h1>
            <p className="text-sm text-slate-600 leading-relaxed">
              Have questions regarding track guidelines, team eligibility, or submission formats? Reach out to the Code-a-Nova coordination team directly.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-2xl p-6 space-y-5 shadow-xs">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5 text-slate-700" />
              </div>
              <div>
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 font-mono">
                  Official Communication
                </div>
                <a
                  href={`mailto:${contactInfo.contactEmail}`}
                  className="text-sm font-bold text-slate-900 hover:text-slate-700 hover:underline font-mono"
                >
                  {contactInfo.contactEmail}
                </a>
                <div className="text-[11px] text-slate-500 mt-0.5">
                  Expected reply window: within 24 hours
                </div>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-2 text-xs text-slate-600">
              <div className="font-bold text-slate-900 font-mono uppercase text-[10px]">
                Support Hours
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                <span>Monday &ndash; Saturday: 09:00 AM &ndash; 07:00 PM IST</span>
              </div>
              <div className="text-[11px] text-emerald-700 font-semibold font-mono">
                ● Emergency technical helpline active during 36-hr finale sprint
              </div>
            </div>

            <div className="border-t border-slate-100 pt-4 space-y-1.5 text-xs">
              <div className="font-bold text-slate-900 font-mono uppercase text-[10px]">
                Quick Links
              </div>
              <div>
                <Link to="/about#rules" className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
                  &bull; Official Scoring Rubric &rarr;
                </Link>
              </div>
              <div>
                <Link to="/#timeline" className="text-slate-600 hover:text-slate-900 flex items-center gap-1">
                  &bull; Competition Timeline &amp; Deadlines &rarr;
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Right Form Column */}
        <div className="md:col-span-7">
          <Card className="shadow-sm border-slate-200 bg-white">
            {isSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 rounded-full flex items-center justify-center mx-auto text-emerald-600">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Inquiry Transmitted</h3>
                <p className="text-xs text-slate-600 max-w-sm mx-auto leading-relaxed">
                  Thank you for reaching out. A committee member will review your inquiry and reply to your email address promptly.
                </p>
                <div className="pt-2">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setIsSubmitted(false)}
                  >
                    Submit Another Inquiry
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-slate-100 pb-2">
                  <h3 className="text-base font-bold text-slate-900 font-display">
                    Send a Message to the Committee
                  </h3>
                  <p className="text-xs text-slate-500">
                    Inquiries are recorded and routed to relevant track leads.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="Full Name"
                    required
                    placeholder="e.g. Alex Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    error={errors.name}
                  />
                  <Input
                    label="Email Address"
                    required
                    type="email"
                    placeholder="alex@college.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    error={errors.email}
                  />
                </div>

                <Input
                  label="Subject (Optional)"
                  placeholder="e.g. Inquiry regarding hardware specifications for IoT track"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                />

                <div className="space-y-1">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                    Your Message <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={6}
                    placeholder="Please specify your query or challenge in detail..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full rounded-lg border px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 bg-white transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-slate-900/10 ${
                      errors.message
                        ? 'border-rose-400 focus:border-rose-500'
                        : 'border-slate-200 hover:border-slate-300 focus:border-slate-800'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-rose-500 font-medium">{errors.message}</p>
                  )}
                </div>

                <div className="pt-2">
                  <Button
                    type="submit"
                    variant="primary"
                    isLoading={isSubmitting}
                    className="w-full sm:w-auto font-bold"
                  >
                    <Send className="w-4 h-4 mr-1.5" />
                    Transmit Inquiry
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Contact;
