export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-white mb-8">Welcome back, User</h1>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Meetings</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Meeting Minutes</h3>
          <p className="text-3xl font-bold text-white">0m</p>
        </div>
        <div className="glass-panel p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Languages Used</h3>
          <p className="text-3xl font-bold text-white">0</p>
        </div>
      </div>

      {/* Upcoming Meetings */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-white mb-4">Upcoming Meetings</h2>
        <div className="glass-panel p-10 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-medium text-white mb-1">No upcoming meetings</h3>
          <p className="text-muted-foreground text-sm max-w-sm mb-6">You don't have any scheduled meetings right now. Create a new meeting to get started.</p>
          <button className="text-primary hover:text-primary/80 font-medium text-sm">Schedule a meeting</button>
        </div>
      </div>
    </div>
  );
}
