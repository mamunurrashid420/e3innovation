import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { Save, AlertCircle, CheckCircle, Info, Share2, BarChart3, Palette, RotateCcw } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import FileUpload from '../../components/FileUpload';

const DEFAULT_APPEARANCE = {
    bg_services_hero: 'https://images.unsplash.com/photo-1519389950473-acc7b968b3d1?w=1920&q=80',
    bg_about_hero: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&q=80',
    bg_projects_hero: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1920&q=80',
    bg_team_hero: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&q=80',
    bg_services_section: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80',
    bg_about_stats_section: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1920&q=80',
    bg_contact_hero: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?w=1920&q=80',
    site_logo: '',
    site_favicon: '',
};

const Settings = () => {
    const [stats, setStats] = useState({
        stats_projects_completed: '',
        stats_happy_clients: '',
        stats_team_members: '',
        stats_years_experience: ''
    });

    const [footer, setFooter] = useState({
        footer_about_text: '',
        contact_address_bd: '',
        contact_address_china: '',
        contact_phone: '',
        contact_email: '',
    });

    const [social, setSocial] = useState({
        social_facebook: '',
        social_twitter: '',
        social_linkedin: '',
        social_instagram: '',
    });

    const [appearance, setAppearance] = useState({
        bg_services_hero: '',
        bg_about_hero: '',
        bg_projects_hero: '',
        bg_team_hero: '',
        bg_services_section: '',
        bg_about_stats_section: '',
        bg_contact_hero: '',
        site_logo: '',
        site_favicon: '',
    });

    const [activeTab, setActiveTab] = useState<'stats' | 'footer' | 'social' | 'appearance'>('stats');

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [alert, setAlert] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

    useEffect(() => {
        fetchAllSettings();
    }, []);

    const fetchAllSettings = async () => {
        try {
            const [statsData, footerData, socialData, appearanceData] = await Promise.all([
                api.settings.getByGroup('stats'),
                api.settings.getByGroup('footer'),
                api.settings.getByGroup('social'),
                api.settings.getByGroup('appearance'),
            ]);

            if (statsData) {
                setStats({
                    stats_projects_completed: statsData.stats_projects_completed || '50+',
                    stats_happy_clients: statsData.stats_happy_clients || '30+',
                    stats_team_members: statsData.stats_team_members || '20+',
                    stats_years_experience: statsData.stats_years_experience || '5+'
                });
            }

            if (footerData) {
                setFooter({
                    footer_about_text: footerData.footer_about_text || 'Your trusted technology partner delivering innovative software solutions.',
                    contact_address_bd: footerData.contact_address_bd || 'Hussain Tower, 5th Floor, Sector #7, Uttara, Dhaka, Bangladesh',
                    contact_address_china: footerData.contact_address_china || '5# Area B, Guxin Road, Zhangcha, Foshan, Guangdong, China',
                    contact_phone: footerData.contact_phone || '+880 1234-567890',
                    contact_email: footerData.contact_email || 'info@e3innovationlimited.com',
                });
            }

            if (socialData) {
                setSocial({
                    social_facebook: socialData.social_facebook || 'https://facebook.com',
                    social_twitter: socialData.social_twitter || 'https://twitter.com',
                    social_linkedin: socialData.social_linkedin || 'https://linkedin.com',
                    social_instagram: socialData.social_instagram || 'https://instagram.com',
                });
            }

            if (appearanceData) {
                setAppearance({
                    bg_services_hero: appearanceData.bg_services_hero || DEFAULT_APPEARANCE.bg_services_hero,
                    bg_about_hero: appearanceData.bg_about_hero || DEFAULT_APPEARANCE.bg_about_hero,
                    bg_projects_hero: appearanceData.bg_projects_hero || DEFAULT_APPEARANCE.bg_projects_hero,
                    bg_team_hero: appearanceData.bg_team_hero || DEFAULT_APPEARANCE.bg_team_hero,
                    bg_services_section: appearanceData.bg_services_section || DEFAULT_APPEARANCE.bg_services_section,
                    bg_about_stats_section: appearanceData.bg_about_stats_section || DEFAULT_APPEARANCE.bg_about_stats_section,
                    bg_contact_hero: appearanceData.bg_contact_hero || DEFAULT_APPEARANCE.bg_contact_hero,
                    site_logo: appearanceData.site_logo || DEFAULT_APPEARANCE.site_logo,
                    site_favicon: appearanceData.site_favicon || DEFAULT_APPEARANCE.site_favicon,
                });
            }
        } catch (error) {
            console.error('Failed to fetch settings:', error);
            setAlert({ type: 'error', message: 'Failed to load settings' });
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setAlert(null);

        try {
            let dataToSave = {};
            let group = '';

            if (activeTab === 'stats') {
                dataToSave = stats;
                group = 'stats';
            } else if (activeTab === 'footer') {
                dataToSave = footer;
                group = 'footer';
            } else if (activeTab === 'social') {
                dataToSave = social;
                group = 'social';
            } else if (activeTab === 'appearance') {
                dataToSave = appearance;
                group = 'appearance';
            }

            await api.settings.update(dataToSave, group);
            setAlert({ type: 'success', message: 'Settings updated successfully' });
        } catch (error) {
            console.error('Failed to update settings:', error);
            setAlert({ type: 'error', message: 'Failed to update settings' });
        } finally {
            setSaving(false);
        }
    };

    const handleStatsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setStats(prev => ({ ...prev, [name]: value }));
    };

    const handleFooterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFooter(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSocial(prev => ({ ...prev, [name]: value }));
    };

    const handleAppearanceChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setAppearance(prev => ({ ...prev, [name]: value }));
    };

    const handleResetAppearance = (field: keyof typeof DEFAULT_APPEARANCE) => {
        setAppearance(prev => ({ ...prev, [field]: DEFAULT_APPEARANCE[field] }));
    };

    if (loading) {
        return (
            <AdminLayout>
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600"></div>
                </div>
            </AdminLayout>
        );
    }

    return (
        <AdminLayout>
            <div className="space-y-8 pb-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-4xl font-black text-slate-900 tracking-tight">System Configuration</h1>
                        <p className="text-slate-500 mt-1 font-medium italic">Fine-tune your platform presence and visual identity</p>
                    </div>

                    <div className="grid grid-cols-2 lg:flex bg-slate-900/5 backdrop-blur-md p-1.5 rounded-[1.5rem] border border-slate-200/50 shadow-inner">
                        <button
                            onClick={() => setActiveTab('stats')}
                            className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'stats'
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 active:scale-95'
                                : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            <BarChart3 className="w-3.5 h-3.5 mr-2" />
                            Statistics
                        </button>
                        <button
                            onClick={() => setActiveTab('footer')}
                            className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'footer'
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 active:scale-95'
                                : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            <Info className="w-3.5 h-3.5 mr-2" />
                            Identity
                        </button>
                        <button
                            onClick={() => setActiveTab('social')}
                            className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'social'
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 active:scale-95'
                                : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            <Share2 className="w-3.5 h-3.5 mr-2" />
                            Social
                        </button>
                        <button
                            onClick={() => setActiveTab('appearance')}
                            className={`flex items-center justify-center px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${activeTab === 'appearance'
                                ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20 active:scale-95'
                                : 'text-slate-500 hover:text-slate-900'
                                }`}
                        >
                            <Palette className="w-3.5 h-3.5 mr-2" />
                            Aesthetics
                        </button>
                    </div>
                </div>

                {alert && (
                    <div className={`p-4 rounded-2xl flex items-center animate-fade-in shadow-lg border-2 ${alert.type === 'success' ? 'bg-green-50 text-green-800 border-green-100' : 'bg-red-50 text-red-800 border-red-100'
                        }`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${alert.type === 'success' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                            {alert.type === 'success' ? (
                                <CheckCircle className="h-5 w-5" />
                            ) : (
                                <AlertCircle className="h-5 w-5" />
                            )}
                        </div>
                        <span className="font-black uppercase text-[10px] tracking-widest">{alert.message}</span>
                    </div>
                )}

                <div className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-white overflow-hidden relative">
                    <div className="absolute top-0 right-0 p-12">
                        <div className="w-64 h-64 bg-blue-100/30 rounded-full blur-[100px] -mr-32 -mt-32" />
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 md:p-12 relative z-10">
                        {activeTab === 'stats' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
                                        <div className="w-2 h-8 bg-blue-600 rounded-full mr-4" />
                                        Growth Metrics
                                    </h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 ml-6">Display your impact and market reach</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Portfolio Success</label>
                                        <input
                                            type="text"
                                            name="stats_projects_completed"
                                            value={stats.stats_projects_completed}
                                            onChange={handleStatsChange}
                                            placeholder="e.g. 50+"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all font-black"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Client Satisfaction</label>
                                        <input
                                            type="text"
                                            name="stats_happy_clients"
                                            value={stats.stats_happy_clients}
                                            onChange={handleStatsChange}
                                            placeholder="e.g. 30+"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all font-black"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Expert Talent</label>
                                        <input
                                            type="text"
                                            name="stats_team_members"
                                            value={stats.stats_team_members}
                                            onChange={handleStatsChange}
                                            placeholder="e.g. 20+"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all font-black"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Industry Mastery</label>
                                        <input
                                            type="text"
                                            name="stats_years_experience"
                                            value={stats.stats_years_experience}
                                            onChange={handleStatsChange}
                                            placeholder="e.g. 5+"
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-100 focus:border-blue-300 outline-none transition-all font-black"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'footer' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
                                        <div className="w-2 h-8 bg-indigo-600 rounded-full mr-4" />
                                        Corporate Identity
                                    </h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 ml-6">Global contact points and core branding</p>
                                </div>
                                <div className="space-y-6 pt-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Company Narrative</label>
                                        <textarea
                                            name="footer_about_text"
                                            value={footer.footer_about_text}
                                            onChange={handleFooterChange}
                                            rows={3}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all font-medium leading-relaxed"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Bangladesh HQ</label>
                                            <input
                                                type="text"
                                                name="contact_address_bd"
                                                value={footer.contact_address_bd}
                                                onChange={handleFooterChange}
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all font-bold"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">China Operations</label>
                                            <input
                                                type="text"
                                                name="contact_address_china"
                                                value={footer.contact_address_china}
                                                onChange={handleFooterChange}
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all font-bold"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Secure Line</label>
                                            <input
                                                type="text"
                                                name="contact_phone"
                                                value={footer.contact_phone}
                                                onChange={handleFooterChange}
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all font-black"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Digital Mailbox</label>
                                            <input
                                                type="email"
                                                name="contact_email"
                                                value={footer.contact_email}
                                                onChange={handleFooterChange}
                                                className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-indigo-100 focus:border-indigo-300 outline-none transition-all font-bold"
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'social' && (
                            <div className="space-y-8 animate-fade-in">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
                                        <div className="w-2 h-8 bg-blue-400 rounded-full mr-4" />
                                        Social Ecosystem
                                    </h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 ml-6">External network presence and connectivity</p>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Meta / Facebook</label>
                                        <input
                                            type="url"
                                            name="social_facebook"
                                            value={social.social_facebook}
                                            onChange={handleSocialChange}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all font-medium"
                                            placeholder="https://facebook.com/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">X / Twitter</label>
                                        <input
                                            type="url"
                                            name="social_twitter"
                                            value={social.social_twitter}
                                            onChange={handleSocialChange}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all font-medium"
                                            placeholder="https://twitter.com/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">LinkedIn Pro</label>
                                        <input
                                            type="url"
                                            name="social_linkedin"
                                            value={social.social_linkedin}
                                            onChange={handleSocialChange}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all font-medium"
                                            placeholder="https://linkedin.com/company/..."
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="block text-xs font-black text-slate-700 uppercase tracking-[0.2em] ml-1">Instagram Core</label>
                                        <input
                                            type="url"
                                            name="social_instagram"
                                            value={social.social_instagram}
                                            onChange={handleSocialChange}
                                            className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:bg-white focus:ring-4 focus:ring-blue-50 focus:border-blue-400 outline-none transition-all font-medium"
                                            placeholder="https://instagram.com/..."
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'appearance' && (
                            <div className="space-y-12 animate-fade-in">
                                <div>
                                    <h3 className="text-2xl font-black text-slate-900 tracking-tight flex items-center">
                                        <div className="w-2 h-8 bg-pink-500 rounded-full mr-4" />
                                        Visual Dynamics
                                    </h3>
                                    <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1 ml-6">Platform aesthetics and section atmospherics</p>
                                </div>

                                <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                                    {[
                                        { label: 'Services Hero', key: 'bg_services_hero' },
                                        { label: 'About Hero', key: 'bg_about_hero' },
                                        { label: 'Projects Hero', key: 'bg_projects_hero' },
                                        { label: 'Team Hero', key: 'bg_team_hero' },
                                        { label: 'Services Section', key: 'bg_services_section' },
                                        { label: 'Stats Section', key: 'bg_about_stats_section' },
                                        { label: 'Contact Hero', key: 'bg_contact_hero' }
                                    ].map((item) => (
                                        <div key={item.key} className="group p-6 bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-500">
                                            <div className="flex justify-between items-center mb-4">
                                                <label className="text-[10px] font-black text-slate-900 uppercase tracking-widest">{item.label}</label>
                                                <button
                                                    type="button"
                                                    onClick={() => handleResetAppearance(item.key as any)}
                                                    className="p-1.5 text-slate-400 hover:text-red-600 transition-colors"
                                                    title="Restore Default"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </button>
                                            </div>

                                            <div className="space-y-4">
                                                <input
                                                    type="text"
                                                    name={item.key}
                                                    value={appearance[item.key as keyof typeof appearance]}
                                                    onChange={handleAppearanceChange}
                                                    className="w-full px-4 py-2 text-[10px] font-mono bg-slate-50 border border-slate-100 rounded-xl focus:bg-white outline-none transition-all"
                                                />
                                                <FileUpload
                                                    label={`Update ${item.label}`}
                                                    folder="appearance"
                                                    onUploadSuccess={(url: string) => setAppearance(prev => ({ ...prev, [item.key]: url }))}
                                                />
                                                {appearance[item.key as keyof typeof appearance] && (
                                                    <div className="relative aspect-video rounded-2xl overflow-hidden shadow-inner bg-slate-900">
                                                        <img
                                                            src={appearance[item.key as keyof typeof appearance]}
                                                            alt={item.label}
                                                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors" />
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}

                                    <div className="group p-6 bg-slate-900 rounded-3xl shadow-xl xl:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-black text-white uppercase tracking-widest">Brand Mark / Logo</label>
                                                <button
                                                    type="button"
                                                    onClick={() => handleResetAppearance('site_logo')}
                                                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <FileUpload
                                                label="Upload Logo"
                                                folder="appearance"
                                                onUploadSuccess={(url: string) => setAppearance(prev => ({ ...prev, site_logo: url }))}
                                            />
                                            {appearance.site_logo && (
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center h-24">
                                                    <img src={appearance.site_logo} alt="Logo" className="max-h-12 object-contain filter brightness-0 invert" />
                                                </div>
                                            )}
                                        </div>

                                        <div className="space-y-4">
                                            <div className="flex justify-between items-center">
                                                <label className="text-[10px] font-black text-white uppercase tracking-widest">Identity / Favicon</label>
                                                <button
                                                    type="button"
                                                    onClick={() => handleResetAppearance('site_favicon')}
                                                    className="p-1.5 text-slate-500 hover:text-red-400 transition-colors"
                                                >
                                                    <RotateCcw className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <FileUpload
                                                label="Upload Favicon"
                                                folder="appearance"
                                                onUploadSuccess={(url: string) => setAppearance(prev => ({ ...prev, site_favicon: url }))}
                                            />
                                            {appearance.site_favicon && (
                                                <div className="p-4 bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center h-24">
                                                    <img src={appearance.site_favicon} alt="Favicon" className="w-12 h-12 object-contain" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <div className="mt-16 flex justify-end border-t border-slate-100 pt-10">
                            <button
                                type="submit"
                                disabled={saving}
                                className="group relative flex items-center px-12 py-4 bg-slate-900 text-white font-black uppercase text-xs tracking-[0.2em] rounded-2xl hover:bg-blue-600 transition-all duration-300 shadow-xl shadow-slate-900/20 active:scale-95 disabled:opacity-50 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                <span className="relative z-10 flex items-center">
                                    {saving ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white mr-3"></div>
                                            Synchronizing...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="h-4 w-4 mr-3" />
                                            Update System State
                                        </>
                                    )}
                                </span>
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl shadow-slate-900/20">
                    <div className="absolute top-0 right-0 p-10 opacity-20">
                        <Info className="w-32 h-32" />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h3 className="text-2xl font-black mb-4 tracking-tight uppercase tracking-[0.1em]">Admin Dispatch</h3>
                        <p className="text-slate-400 font-medium leading-[1.8]">
                            Configuration changes are applied atomically by category. Updating <span className="text-blue-400 font-black">Growth Metrics</span> will only commit modifications to that specific cluster, ensuring system stability and integrity.
                        </p>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Settings;
