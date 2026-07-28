export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Settings</h1>
      
      <div className="glass-panel p-8 max-w-2xl">
        <h2 className="text-xl font-semibold text-white mb-6">Account Preferences</h2>
        
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Display Name</label>
            <input type="text" defaultValue="User" className="w-full h-10 px-4 rounded-lg bg-input border border-border text-white focus:outline-none focus:ring-1 focus:ring-ring" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Email Address</label>
            <input type="email" defaultValue="user@example.com" disabled className="w-full h-10 px-4 rounded-lg bg-input/50 border border-border text-white/50 cursor-not-allowed" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-muted-foreground mb-2">Default Language</label>
            <select className="w-full h-10 px-4 rounded-lg bg-input border border-border text-white focus:outline-none focus:ring-1 focus:ring-ring">
              <option>English</option>
              <option>Spanish</option>
              <option>French</option>
              <option>Hindi</option>
              <option>Japanese</option>
            </select>
          </div>
          
          <div className="pt-4 border-t border-border flex justify-end">
            <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-2 rounded-lg font-medium transition-colors">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
