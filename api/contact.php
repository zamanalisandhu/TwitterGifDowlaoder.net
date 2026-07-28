<?php
$page_title = "Contact Us | TwitterGIF";
$page_desc = "Get in touch with the TwitterGIF team for support, feedback, or business inquiries.";
include 'header.php';
?>

<main id="main-content" class="min-h-screen saas-gradient text-slate-700">
    <div class="pt-24 pb-16 container mx-auto px-4 max-w-4xl">
        <div class="text-center mb-16">
            <div class="inline-flex items-center justify-center p-4 rounded-3xl bg-indigo-50 text-primary mb-6 shadow-sm shadow-indigo-100/50">
                <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
            </div>
            <h1 class="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight text-slate-800">
                Contact <span class="text-gradient">Us</span>
            </h1>
            <p class="text-lg text-slate-500 font-medium">We'd love to hear from you!</p>
        </div>

        <div class="flex justify-center mb-16">
            <div class="p-8 saas-card text-center hover:border-primary/50 max-w-sm w-full">
                <div class="inline-flex items-center justify-center p-4 rounded-2xl bg-purple-500/10 text-purple-500 mb-6 group-hover:scale-105 transition-transform duration-300">
                    <svg class="w-8 h-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                </div>
                <h3 class="text-2xl font-bold mb-2 text-slate-800">Social Media</h3>
                <p class="text-slate-400 text-sm font-semibold mb-4">Follow us for updates</p>
                <p class="text-indigo-600 font-bold text-lg">Twitter / X: @TwitterGIF</p>
            </div>
        </div>

        <!-- Contact Form Container -->
        <div id="contact-form-container" class="p-8 md:p-12 bg-white border border-slate-100 rounded-[28px] mb-16 relative overflow-hidden shadow-xl shadow-slate-100/50">
            <h2 class="text-3xl font-extrabold mb-10 text-slate-800 text-center">Send us a Message</h2>
            
            <form id="contact-form" class="space-y-6 max-w-2xl mx-auto">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="space-y-2">
                        <label for="full-name" class="text-xs font-bold uppercase tracking-wider text-slate-400">Full Name</label>
                        <input 
                            type="text" 
                            id="full-name" 
                            name="name" 
                            required 
                            placeholder="John Doe"
                            class="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-primary/50 transition-all duration-300 text-slate-800 font-semibold"
                        />
                    </div>
                    <div class="space-y-2">
                        <label for="email-address" class="text-xs font-bold uppercase tracking-wider text-slate-400">Email Address</label>
                        <input 
                            type="email" 
                            id="email-address" 
                            name="email" 
                            required 
                            placeholder="john@example.com"
                            class="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-primary/50 transition-all duration-300 text-slate-800 font-semibold"
                        />
                    </div>
                </div>
                <div class="space-y-2">
                    <label for="subject" class="text-xs font-bold uppercase tracking-wider text-slate-400">Subject</label>
                    <input 
                        type="text" 
                        id="subject" 
                        name="subject" 
                        required 
                        placeholder="How can we help?"
                        class="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-primary/50 transition-all duration-300 text-slate-800 font-semibold"
                    />
                </div>
                <div class="space-y-2">
                    <label for="message" class="text-xs font-bold uppercase tracking-wider text-slate-400">Message</label>
                    <textarea 
                        id="message" 
                        name="message" 
                        required 
                        rows="5"
                        placeholder="Your message here..."
                        class="w-full bg-slate-50/50 border border-slate-200/80 rounded-2xl px-5 py-4 outline-none focus:bg-white focus:border-primary/50 transition-all duration-300 text-slate-800 font-semibold resize-none"
                    ></textarea>
                </div>
                <button 
                    type="submit"
                    class="w-full py-4 rounded-full bg-gradient-to-r from-primary to-[#06B6D4] text-white font-bold hover:opacity-95 active:scale-[0.98] transition-all shadow-md shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg class="w-5 h-5 btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    <span class="btn-text">Send Message</span>
                </button>
                <p id="form-error" class="text-red-500 text-sm text-center mt-4 hidden">Oops! Something went wrong. Please try again later.</p>
            </form>
        </div>

        <div class="p-8 md:p-12 saas-card">
            <h2 class="text-3xl font-extrabold mb-10 text-slate-800 text-center">Frequently Asked Questions</h2>
            <div class="space-y-6 max-w-2xl mx-auto">
                <div>
                    <h4 class="text-lg font-bold text-slate-800 mb-2">How long does it take to get a response?</h4>
                    <p class="text-slate-500 text-sm leading-relaxed">We typically respond to all emails within 24-48 business hours.</p>
                </div>
                <div>
                    <h4 class="text-lg font-bold text-slate-800 mb-2">Can I request a new feature?</h4>
                    <p class="text-slate-500 text-sm leading-relaxed">Absolutely! We love hearing from our users. Send us your ideas and we'll see if we can implement them.</p>
                </div>
            </div>
        </div>
    </div>
</main>

<?php include 'footer.php'; ?>
