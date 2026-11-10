import { useState } from 'react'

function App() {
  const [searchText, setSearchText] = useState("")
  const [locationText, setLocationText] = useState("")
  const [selectedJob, setSelectedJob] = useState(null)
  const [savedJobs, setSavedJobs] = useState([])
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isSignup, setIsSignup] = useState(false)

  const jobs = [
    { title: "Frontend Developer", company: "Paystack", location: "Lagos", type: "Hybrid", salary: "₦400k - ₦600k", tag: "Full-time", hot: true, category: "Tech & Engineering", desc: "Build beautiful, fast payment pages used by millions of Nigerians.", reqs: ["2+ years React", "Strong CSS / Tailwind", "Know Git & GitHub"] },
    { title: "UI Designer", company: "Flutterwave", location: "Remote", type: "Remote", salary: "₦350k - ₦500k", tag: "Remote", hot: false, category: "Design & Creative", desc: "Design clean dashboards and mobile flows for African businesses.", reqs: ["Figma expert", "Portfolio"] },
    { title: "Customer Support", company: "Kuda Bank", location: "Abuja", type: "Onsite", salary: "₦180k - ₦220k", tag: "Full-time", hot: false, category: "Finance & Accounting", desc: "Help customers solve account issues quickly. Training provided.", reqs: ["Good English", "Patient & friendly"] },
    { title: "Backend Engineer", company: "Moniepoint", location: "Lagos", type: "Hybrid", salary: "₦500k - ₦750k", tag: "Full-time", hot: true, category: "Tech & Engineering", desc: "Build APIs that power payments for millions of small businesses.", reqs: ["Node.js or Python", "Databases"] },
    { title: "Product Manager", company: "PiggyVest", location: "Lagos", type: "Remote", salary: "₦600k - ₦900k", tag: "Remote", hot: false, category: "Tech & Engineering", desc: "Lead savings features from idea to launch.", reqs: ["3+ years product"] },
    { title: "Social Media Manager", company: "Chowdeck", location: "Lagos", type: "Onsite", salary: "₦200k - ₦300k", tag: "Contract", hot: false, category: "Marketing & Sales", desc: "Grow Chowdeck on Instagram, TikTok and X.", reqs: ["Know TikTok / Reels"] },
    { title: "Marketing Lead", company: "Paystack", location: "Abuja", type: "Hybrid", salary: "₦450k - ₦650k", tag: "Full-time", hot: false, category: "Marketing & Sales", desc: "Lead campaigns to bring more businesses to Paystack.", reqs: ["5+ years marketing"] },
    { title: "Graphic Designer", company: "Flutterwave", location: "Remote", type: "Remote", salary: "₦250k - ₦400k", tag: "Contract", hot: false, category: "Design & Creative", desc: "Design social posts, banners and brand assets.", reqs: ["Photoshop / Figma"] },
    { title: "Accountant", company: "Kuda Bank", location: "Lagos", type: "Onsite", salary: "₦300k - ₦450k", tag: "Full-time", hot: false, category: "Finance & Accounting", desc: "Manage reports and reconciliations.", reqs: ["Excel expert"] },
    { title: "Data Analyst", company: "Moniepoint", location: "Lagos", type: "Hybrid", salary: "₦350k - ₦550k", tag: "Full-time", hot: true, category: "Tech & Engineering", desc: "Turn data into decisions for product team.", reqs: ["SQL", "Excel / Python"] },
    { title: "Content Writer", company: "PiggyVest", location: "Remote", type: "Remote", salary: "₦180k - ₦280k", tag: "Contract", hot: false, category: "Marketing & Sales", desc: "Write blog, email and social content about money.", reqs: ["Good writing"] },
    { title: "Sales Representative", company: "Chowdeck", location: "Port Harcourt", type: "Onsite", salary: "₦150k - ₦250k + Commission", tag: "Full-time", hot: false, category: "Marketing & Sales", desc: "Bring restaurants onboard Chowdeck.", reqs: ["Confident speaker"] },
  ];

  const filteredJobs = jobs.filter((job) => {
    const matchText = job.title.toLowerCase().includes(searchText.toLowerCase()) || job.company.toLowerCase().includes(searchText.toLowerCase()) || job.category.toLowerCase().includes(searchText.toLowerCase());
    const matchLocation = job.location.toLowerCase().includes(locationText.toLowerCase());
    return matchText && matchLocation;
  });

  const toggleSave = (title) => {
    if (savedJobs.includes(title)) setSavedJobs(savedJobs.filter(t => t !== title))
    else setSavedJobs([...savedJobs, title])
  }

  const handleLogin = (e) => {
    e.preventDefault()
    if (!email || !password) { alert("Please enter email and password"); return }
    setUser(email.split("@")[0])
    setShowLogin(false)
  }

  const jobModal = selectedJob && (
      <div className="modal-bg" onClick={() => setSelectedJob(null)}>
        <div className="modal" onClick={(e) => e.stopPropagation()}>
          <button className="close" onClick={() => setSelectedJob(null)}>✕ Close</button>
          <div className="logo" style={{width:'64px', height:'64px', fontSize:'28px'}}>{selectedJob.company[0]}</div>
          <h2>{selectedJob.title}</h2>
          <p style={{color:'#64748b', margin:'8px 0'}}>{selectedJob.company} • {selectedJob.location} • {selectedJob.type}</p>
          <p className="salary" style={{fontSize:'20px'}}>{selectedJob.salary} / month</p>
          <p style={{color:'#334155', lineHeight:'1.6', marginTop:'16px'}}>{selectedJob.desc}</p>
          <div style={{display:'flex', gap:'10px', marginTop:'20px'}}>
            <button className="apply-btn" onClick={() => { alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}`); setSelectedJob(null); }}>Apply Now →</button>
            <button className="save-btn" onClick={() => toggleSave(selectedJob.title)}>{savedJobs.includes(selectedJob.title) ? "❤️ Saved" : "🤍 Save Job"}</button>
          </div>
        </div>
      </div>
  );

  // ===== 1. LOGIN PAGE - CLEAN, NO JOB FEATURES =====
  if (showLogin) {
    return (
        <div className="login-page">
          <div className="login-left">
            <h1 onClick={() => setShowLogin(false)} style={{cursor:'pointer'}}>Work<span>Naija</span><span style={{color:'#f59e0b'}}>.</span></h1>
            <h2>Find work that<br/>fits you.</h2>
            <p className="login-left-sub">Nigeria's most trusted job platform. Verified companies, real salaries, fast responses.</p>
            <div className="login-left-stats"><b>12,400+</b> Jobs &nbsp;•&nbsp; <b>850+</b> Companies &nbsp;•&nbsp; <b>45,000+</b> Job Seekers</div>
          </div>
          <div className="login-right">
            <button className="back-btn" onClick={() => setShowLogin(false)}>← Back to Home</button>
            <div className="login-form-box">
              <h2>{isSignup ? "Create your account" : "Welcome back"}</h2>
              <p>{isSignup ? "Join 45,000+ Nigerians finding work" : "Sign in to access your dashboard"}</p>
              <form onSubmit={handleLogin}>
                {isSignup && (<><label>Full Name</label><input className="login-input" placeholder="e.g. Chinedu Okafor" /></>)}
                <label>Email</label><input className="login-input" placeholder="you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                <label>Password</label><input className="login-input" type="password" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="login-big-btn">{isSignup ? "Create Account →" : "Log in →"}</button>
              </form>
              <p className="login-switch">{isSignup ? "Already have an account? " : "Don't have an account? "}<b onClick={() => setIsSignup(!isSignup)}>{isSignup ? "Log in" : "Sign up free"}</b></p>
              <div className="login-demo">Demo: <b>test@gmail.com / 12345</b></div>
            </div>
          </div>
        </div>
    )
  }

  // ===== 2. DASHBOARD - AFTER LOGIN, NA HERE JOBS DEY =====
  if (user) {
    return (
        <div className="page">
          <header className="header">
            <h1>Work<span>Naija</span><span className="dot">.</span></h1>
            <nav>
              <a href="#">Dashboard</a><a href="#">My Applications</a><a href="#">Saved ({savedJobs.length})</a>
              <span style={{background:'#e8f5ee', padding:'8px 14px', borderRadius:'100px', fontWeight:'700', fontSize:'14px'}}>Hi, {user} <span onClick={() => setUser(null)} style={{cursor:'pointer', color:'red'}}>Logout</span></span>
            </nav>
          </header>
          <main className="hero" style={{padding:'40px 20px'}}>
            <h2 style={{fontSize:'34px'}}>Welcome back, {user} 👋</h2>
            <p>You have {savedJobs.length} saved jobs. Here are new jobs matched for you.</p>
            <div className="search">
              <input placeholder="Search job title, skill or company" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
              <input placeholder="Lagos, Abuja, Remote..." value={locationText} onChange={(e) => setLocationText(e.target.value)} />
              <button>Search Jobs →</button>
            </div>
          </main>
          <section className="section">
            <div className="section-head"><h3>Available Jobs ({filteredJobs.length})</h3><a href="#" onClick={() => {setSearchText(""); setLocationText("");}}>Clear filter →</a></div>
            <div className="jobs">
              {filteredJobs.map((job) => (
                  <div className="card" key={job.title} onClick={() => setSelectedJob(job)} style={{cursor:'pointer'}}>
                    {job.hot && <span className="hot">🔥 HOT</span>}
                    <div className="logo">{job.company[0]}</div>
                    <h4>{job.title}</h4>
                    <p>{job.company} • {job.location} • {job.type}</p>
                    <p className="salary">{job.salary} / month</p>
                    <div className="tags"><span>{job.tag}</span><span>{job.category}</span></div>
                    <button>View Details →</button>
                  </div>
              ))}
            </div>
          </section>
          <footer><h2>Work<span>Naija</span>.</h2><p>© 2026 WorkNaija</p></footer>
          {jobModal}
        </div>
    )
  }

  // ===== 3. LANDING PAGE - BEFORE LOGIN, ONLY TALK ABOUT SITE =====
  return (
      <div className="page">
        <header className="header">
          <h1>Work<span>Naija</span><span className="dot">.</span></h1>
          <nav>
            <a href="#">Find Jobs</a><a href="#">Companies</a><a href="#">Career Guide</a>
            <a href="#" className="login" onClick={(e) => {e.preventDefault(); setShowLogin(true)}}>Log in</a>
            <button onClick={() => setShowLogin(true)}>Get Started - It's Free</button>
          </nav>
        </header>

        <main className="hero">
          <div className="badge">🔥 2,482 new jobs this week in Nigeria</div>
          <h2>Find Work That <span>Fits You</span><br/>In Nigeria</h2>
          <p>Real jobs from verified companies. No scams. No wahala. Apply in 2 minutes.</p>
          <div style={{display:'flex', gap:'12px', justifyContent:'center', marginTop:'20px'}}>
            <button onClick={() => setShowLogin(true)} style={{background:'#008751', color:'white', border:'none', padding:'14px 26px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>Browse Jobs →</button>
            <button onClick={() => setShowLogin(true)} style={{background:'white', border:'1px solid #e2e8f0', padding:'14px 26px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>For Employers</button>
          </div>
          <div className="stats"><div><b>12,400+</b><span>Active Jobs</span></div><div><b>850+</b><span>Verified Companies</span></div><div><b>96%</b><span>Response Rate</span></div></div>
        </main>

        <section className="trusted">Trusted by teams at <b>Paystack</b> • <b>Flutterwave</b> • <b>Kuda</b> • <b>Moniepoint</b> • <b>PiggyVest</b> • <b>Chowdeck</b></section>

        <section className="section">
          <h3>Browse by Category</h3>
          <p style={{color:'#64748b', marginBottom:'16px'}}>Find work in the field that fits your skills.</p>
          <div className="cats">
            <div onClick={() => setShowLogin(true)} style={{cursor:'pointer'}}>💻 Tech & Engineering <span>View jobs →</span></div>
            <div onClick={() => setShowLogin(true)} style={{cursor:'pointer'}}>🎨 Design & Creative <span>View jobs →</span></div>
            <div onClick={() => setShowLogin(true)} style={{cursor:'pointer'}}>📈 Marketing & Sales <span>View jobs →</span></div>
            <div onClick={() => setShowLogin(true)} style={{cursor:'pointer'}}>💰 Finance & Accounting <span>View jobs →</span></div>
          </div>
        </section>

        <section className="how">
          <h3>How WorkNaija Works</h3>
          <div className="steps">
            <div><b>1. Create Profile</b><p>Add your skills and CV in 2 minutes.</p></div>
            <div><b>2. Apply</b><p>One-click apply to verified jobs only.</p></div>
            <div><b>3. Get Hired</b><p>Chat directly with the recruiter.</p></div>
          </div>
        </section>

        <section className="section" style={{textAlign:'center'}}>
          <h3>Why Nigerians Trust WorkNaija</h3>
          <p style={{color:'#64748b', maxWidth:'600px', margin:'0 auto 20px'}}>We verify every company, remove scam jobs the same day, and make sure recruiters reply. That is why our members get hired faster.</p>
          <button onClick={() => setShowLogin(true)} style={{background:'#008751', color:'white', border:'none', padding:'14px 28px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>Create Free Account →</button>
        </section>

        <footer><h2>Work<span>Naija</span>.</h2><p>Built for Nigerians, by Nigerians. © 2026 WorkNaija</p></footer>
      </div>
  )
}

export default App