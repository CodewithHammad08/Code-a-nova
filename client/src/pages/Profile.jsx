import React, { useState, useEffect } from 'react';
import { User, ShieldCheck, Mail, Building, Save, CheckCircle2 } from 'lucide-react';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Select from '../components/common/Select';
import Card from '../components/common/Card';
import useAuth from '../hooks/useAuth';
import { COURSES, BRANCHES, YEARS, POPULAR_COLLEGES } from '../utils/constants';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user, updateUserProfile } = useAuth();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobileNumber: '',
    college: '',
    customCollege: '',
    course: 'B.Tech',
    branch: 'CSE',
    year: '3rd Year',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      const isKnownCollege = POPULAR_COLLEGES.includes(user.college);
      setFormData({
        fullName: user.fullName || '',
        email: user.email || '',
        mobileNumber: user.mobileNumber || '',
        college: isKnownCollege ? user.college : (user.college ? 'Other / Custom College' : ''),
        customCollege: isKnownCollege ? '' : (user.college || ''),
        course: user.course || 'B.Tech',
        branch: user.branch || 'CSE',
        year: user.year || '3rd Year',
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || formData.fullName.trim().length < 3) {
      toast.error('Full name must be at least 3 characters');
      return;
    }

    const effectiveCollege =
      formData.college === 'Other / Custom College'
        ? formData.customCollege.trim()
        : formData.college.trim();

    setIsLoading(true);
    try {
      await updateUserProfile({
        fullName: formData.fullName.trim(),
        mobileNumber: formData.mobileNumber.trim(),
        college: effectiveCollege,
        course: formData.course,
        branch: formData.branch,
        year: formData.year,
      });
      toast.success('Profile settings updated successfully.');
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to update profile settings.';
      toast.error(msg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-8">
      {/* Page Title */}
      <div className="border-b border-[#E5E7EB] pb-5">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-[#17243A] tracking-tight">
          Profile Settings
        </h1>
        <p className="text-xs sm:text-sm text-[#6B7280]">
          Manage your personal credentials, contact number, and academic affiliations.
        </p>
      </div>

      <div className="space-y-6">
        <Card className="shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Account Info Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-[#F7F7F4]">
              <div className="w-10 h-10 rounded-[5px] bg-[#17243A] text-white flex items-center justify-center font-display font-bold text-sm">
                {user?.fullName ? user.fullName.slice(0, 2) : 'U'}
              </div>
              <div>
                <div className="text-sm font-bold text-[#17243A]">
                  {user?.fullName || 'Participant Account'}
                </div>
                <div className="text-xs text-[#21845B] font-medium flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Verified Participant ({user?.role || 'participant'})
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Input
                label="Full Name"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />

              <div>
                <Input
                  label="Registered Email"
                  disabled
                  value={formData.email}
                  helperText="Email is permanently bound to verified account."
                />
              </div>

              <Input
                label="Mobile Number (India)"
                type="tel"
                placeholder="10-digit number"
                value={formData.mobileNumber}
                onChange={(e) =>
                  setFormData({ ...formData, mobileNumber: e.target.value })
                }
              />

              <div>
                <Select
                  label="College / Institution"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  options={POPULAR_COLLEGES}
                />
                {formData.college === 'Other / Custom College' && (
                  <div className="mt-2">
                    <Input
                      placeholder="Specify institution name..."
                      value={formData.customCollege}
                      onChange={(e) =>
                        setFormData({ ...formData, customCollege: e.target.value })
                      }
                    />
                  </div>
                )}
              </div>

              <Select
                label="Degree / Course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
                options={COURSES}
              />

              <Select
                label="Engineering Branch"
                value={formData.branch}
                onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                options={BRANCHES}
              />

              <Select
                label="Year of Study"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                options={YEARS}
              />
            </div>

            <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
              <span className="text-xs text-[#6B7280]">
                Last updated:{' '}
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleDateString()
                  : 'Today'}
              </span>

              <Button
                type="submit"
                variant="primary"
                size="md"
                isLoading={isLoading}
                className="gap-2"
              >
                <Save className="w-4 h-4" />
                Save Profile Changes
              </Button>
            </div>
          </form>
        </Card>

        {/* Security Summary Card */}
        <Card className="bg-[#FAFAFA] border-[#E5E7EB]">
          <div className="flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-[#21845B] shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs text-[#4B5563]">
              <div className="font-semibold text-[#17243A]">Security & Privacy Protection</div>
              <p>
                Your passwords are never stored in plaintext and are salted using bcrypt. All session cookies are configured with HttpOnly and strict domain isolation.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile;
