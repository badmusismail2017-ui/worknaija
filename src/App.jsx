import { useState } from 'react'

function App() {
    const [page, setPage] = useState("landing") // landing | login | dashboard
    const [dashTab, setDashTab] = useState("jobs") // jobs | applications
    const [searchText, setSearchText] = useState("")
    const [locationText, setLocationText] = useState("")
    const [appliedJobs, setAppliedJobs] = useState([])
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    // 15 JOBS NOW - WE ADD, WE NO REDUCE
    const jobs = [
        { id: 1, title: "Frontend Developer", company: "Paystack", location: "Lagos", type: "Hybrid", salary: "₦400k - ₦600k", tag: "Full-time", hot: true, category: "Tech & Engineering" },
        { id: 2, title: "UI Designer", company: "Flutterwave", location: "Remote", type: "Remote", salary: "₦350k - ₦500k", tag: "Remote", hot: false, category: "Design & Creative" },
        { id: 3, title: "Customer Support", company: "Kuda Bank", location: "Abuja", type: "Onsite", salary: "₦180k - ₦220k", tag: "Full-time", hot: false, category: "Finance & Accounting" },
        { id: 4, title: "Backend Engineer", company: "Moniepoint", location: "Lagos", type: "Hybrid", salary: "₦500k - ₦750k", tag: "Full-time", hot: true, category: "Tech & Engineering" },
        { id: 5, title: "Product Manager", company: "PiggyVest", location: "Lagos", type: "Remote", salary: "₦600k - ₦900k", tag: "Remote", hot: false, category: "Tech & Engineering" },
        { id: 6, title: "Social Media Manager", company: "Chowdeck", location: "Lagos", type: "Onsite", salary: "₦200k - ₦300k", tag: "Contract", hot: false, category: "Marketing & Sales" },
        { id: 7, title: "Marketing Lead", company: "Paystack", location: "Abuja", type: "Hybrid", salary: "₦450k - ₦650k", tag: "Full-time", hot: false, category: "Marketing & Sales" },
        { id: 8, title: "Graphic Designer", company: "Flutterwave", location: "Remote", type: "Remote", salary: "₦250k - ₦400k", tag: "Contract", hot: false, category: "Design & Creative" },
        { id: 9, title: "Accountant", company: "Kuda Bank", location: "Lagos", type: "Onsite", salary: "₦300k - ₦450k", tag: "Full-time", hot: false, category: "Finance & Accounting" },
        { id: 10, title: "Data Analyst", company: "Moniepoint", location: "Lagos", type: "Hybrid", salary: "₦350k - ₦550k", tag: "Full-time", hot: true, category: "Tech & Engineering" },
        { id: 11, title: "Content Writer", company: "PiggyVest", location: "Remote", type: "Remote", salary: "₦150k - ₦250k", tag: "Contract", hot: false, category: "Marketing & Sales" },
        { id: 12, title: "Mobile Developer", company: "Chowdeck", location: "Lagos", type: "Onsite", salary: "₦450k - ₦700k", tag: "Full-time", hot: true, category: "Tech & Engineering" },
        { id: 13, title: "HR Officer", company: "Kuda Bank", location: "Abuja", type: "Onsite", salary: "₦220k - ₦300k", tag: "Full-time", hot: false, category: "Finance & Accounting" },
        { id: 14, title: "Video Editor", company: "Flutterwave", location: "Remote", type: "Remote", salary: "₦200k - ₦350k", tag: "Contract", hot: false, category: "Design & Creative" },
        { id: 15, title: "Sales Executive", company: "Moniepoint", location: "Port Harcourt", type: "Onsite", salary: "₦180k - ₦280k", tag: "Full-time", hot: false, category: "Marketing & Sales" },
    ];

    const filteredJobs = jobs.filter((job) => {
        const matchText = job.title.toLowerCase().includes(searchText.toLowerCase()) || job.company.toLowerCase().includes(searchText.toLowerCase()) || job.category.toLowerCase().includes(searchText.toLowerCase());
        const matchLocation = job.location.toLowerCase().includes(locationText.toLowerCase());
        return matchText && matchLocation;
    });

    const isApplied = (id) => appliedJobs.some(a => a.job.id === id)

    const handleApply = (job) => {
        if (isApplied(job.id)) { setDashTab("applications"); return }
        setAppliedJobs([{ job, status: "Under Review", date: new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) }, ...appliedJobs])
        setDashTab("applications")
    }

    const handleLogin = (e) => {
        e.preventDefault()
        if (!email || !password) { alert("Put email and password"); return }
        setPage("dashboard")
        setDashTab("jobs")
    }

    // ===== LANDING PAGE - NO JOBS HERE, JUST ADVERT =====
    if (page === "landing") {
        return (
            <div className="page">
                <header className="header">
                    <h1>Work<span>Naija</span><span className="dot">.</span></h1>
                    <nav>
                        <a href="#" onClick={(e) => {e.preventDefault(); setPage("login")}}>Find Jobs</a>
                        <a href="#">Companies</a>
                        <a href="#">Career Guide</a>
                        <a href="#" className="login" onClick={(e) => {e.preventDefault(); setPage("login")}}>Log in</a>
                        <button onClick={() => setPage("login")}>Post a Job - It's Free</button>
                    </nav>
                </header>
                <main className="hero">
                    <div className="badge">🔥 2,482 new jobs this week in Nigeria</div>
                    <h2>Find Work Wey <span>Fit You</span><br/>For Naija</h2>
                    <p>Real jobs from verified companies. No scam. No wahala. Apply in 2 minutes.</p>
                    <div className="search">
                        <input placeholder="🔍 Job title, skill or company" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <input placeholder="📍 Lagos, Abuja, Remote..." value={locationText} onChange={(e) => setLocationText(e.target.value)} />
                        <button onClick={() => setPage("login")}>Search Jobs →</button>
                    </div>
                    <p style={{marginTop:'12px', color:'#64748b', fontSize:'14px'}}>Login to see all 15 jobs and apply 👆</p>
                    <div className="stats">
                        <div><b>12,400+</b><span>Active Jobs</span></div>
                        <div><b>850+</b><span>Verified Companies</span></div>
                        <div><b>96%</b><span>Response Rate</span></div>
                    </div>
                </main>
                <section className="trusted">Trusted by teams at <b>Paystack</b> • <b>Flutterwave</b> • <b>Kuda</b> • <b>Moniepoint</b> • <b>PiggyVest</b> • <b>Chowdeck</b></section>
                <section className="section">
                    <h3>Browse by Category</h3>
                    <div className="cats">
                        <div onClick={() => setPage("login")} style={{cursor:'pointer'}}>💻 Tech & Engineering <span>Login to view</span></div>
                        <div onClick={() => setPage("login")} style={{cursor:'pointer'}}>🎨 Design & Creative <span>Login to view</span></div>
                        <div onClick={() => setPage("login")} style={{cursor:'pointer'}}>📈 Marketing & Sales <span>Login to view</span></div>
                        <div onClick={() => setPage("login")} style={{cursor:'pointer'}}>💰 Finance & Accounting <span>Login to view</span></div>
                    </div>
                </section>
                <section className="how">
                    <h3>How WorkNaija Works</h3>
                    <div className="steps">
                        <div><b>1. Create Profile</b><p>Add your skills, CV in 2 mins</p></div>
                        <div><b>2. Apply</b><p>One click apply to verified jobs</p></div>
                        <div><b>3. Get Hired</b><p>Chat directly with recruiter</p></div>
                    </div>
                </section>
                <footer><h2>Work<span>Naija</span>.</h2><p>Built for Nigerians, by Nigerians. © 2026 WorkNaija</p></footer>
            </div>
        )
    }

    // ===== LOGIN PAGE =====
    if (page === "login") {
        return (
            <div className="page">
                <header className="header">
                    <h1 onClick={() => setPage("landing")} style={{cursor:'pointer'}}>Work<span>Naija</span><span className="dot">.</span></h1>
                    <nav><a href="#" onClick={(e) => {e.preventDefault(); setPage("landing")}}>← Back Home</a></nav>
                </header>
                <main style={{maxWidth:'420px', margin:'60px auto', background:'white', padding:'30px', borderRadius:'16px'}}>
                    <h2 style={{fontSize:'26px'}}>Welcome back 👋</h2>
                    <p style={{color:'#64748b', margin:'8px 0 20px'}}>Login to see jobs & track applications</p>
                    <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'12px'}}>
                        <input placeholder="Email - e.g. you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{padding:'14px', borderRadius:'10px', border:'1px solid #e2e8f0'}} />
                        <input type="password" placeholder="Password - anything" value={password} onChange={(e) => setPassword(e.target.value)} style={{padding:'14px', borderRadius:'10px', border:'1px solid #e2e8f0'}} />
                        <button type="submit" style={{background:'#0f766e', color:'white', border:'none', padding:'14px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>Log In → Go to Dashboard</button>
                    </form>
                    <p style={{marginTop:'14px', fontSize:'13px', color:'#64748b', textAlign:'center'}}>Demo: any email + any password go work</p>
                </main>
            </div>
        )
    }

    // ===== DASHBOARD - NA HERE ALL JOBS + APPLICATIONS DEY =====
    return (
        <div className="page">
            <header className="header">
                <h1 onClick={() => setPage("landing")} style={{cursor:'pointer'}}>Work<span>Naija</span><span className="dot">.</span></h1>
                <nav>
                    <a href="#" onClick={(e) => {e.preventDefault(); setDashTab("jobs")}}>Find Jobs</a>
                    <a href="#" onClick={(e) => {e.preventDefault(); setDashTab("applications")}}>My Applications {appliedJobs.length > 0 && `(${appliedJobs.length})`}</a>
                    <a href="#" className="login" onClick={(e) => {e.preventDefault(); setPage("landing")}}>Log out</a>
                    <button>Hi, {email.split('@')[0] || 'User'} 👋</button>
                </nav>
            </header>

            <section className="section">
                <h3>Welcome to your Dashboard 🎉</h3>
                <p style={{color:'#64748b', marginTop:'6px'}}>You don apply for <b>{appliedJobs.length}</b> jobs. Keep going!</p>
                <div style={{display:'flex', gap:'10px', marginTop:'16px'}}>
                    <button onClick={() => setDashTab("jobs")} style={{padding:'10px 20px', borderRadius:'20px', border:'none', cursor:'pointer', background: dashTab === 'jobs' ? '#0f766e' : '#e2e8f0', color: dashTab === 'jobs' ? 'white' : '#0f172a', fontWeight:'700'}}>🔍 Find Jobs</button>
                    <button onClick={() => setDashTab("applications")} style={{padding:'10px 20px', borderRadius:'20px', border:'none', cursor:'pointer', background: dashTab === 'applications' ? '#0f766e' : '#e2e8f0', color: dashTab === 'applications' ? 'white' : '#0f172a', fontWeight:'700'}}>📋 My Applications ({appliedJobs.length})</button>
                </div>
            </section>

            {dashTab === "jobs" ? (
                <section className="section">
                    <div className="search">
                        <input placeholder="🔍 Job title, skill or company" value={searchText} onChange={(e) => setSearchText(e.target.value)} />
                        <input placeholder="📍 Lagos, Abuja, Remote..." value={locationText} onChange={(e) => setLocationText(e.target.value)} />
                        <button>Search Jobs →</button>
                    </div>
                    <div className="section-head" style={{marginTop:'20px'}}>
                        <h3>Featured Jobs ({filteredJobs.length} found)</h3>
                        <a href="#" onClick={() => {setSearchText(""); setLocationText("");}}>Clear filter →</a>
                    </div>
                    {filteredJobs.length === 0 ? (
                        <div style={{background:'white', padding:'40px', textAlign:'center', borderRadius:'14px'}}><h3>No job found 😢</h3></div>
                    ) : (
                        <div className="jobs">
                            {filteredJobs.map((job) => (
                                <div className="card" key={job.id}>
                                    {job.hot && <span className="hot">🔥 HOT</span>}
                                    <div className="logo">{job.company[0]}</div>
                                    <h4>{job.title}</h4>
                                    <p>{job.company} • {job.location} • {job.type}</p>
                                    <p className="salary">{job.salary} / month</p>
                                    <div className="tags"><span>{job.tag}</span><span>{job.category}</span></div>
                                    <button onClick={() => handleApply(job)} style={isApplied(job.id) ? {background:'#e2e8f0', color:'#0f172a'} : {}}>{isApplied(job.id) ? "Applied ✓ - View Status" : "Apply Now →"}</button>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            ) : (
                <section className="section" style={{minHeight:'50vh'}}>
                    <h3>My Applications ({appliedJobs.length})</h3>
                    <p style={{color:'#64748b', marginTop:'6px', marginBottom:'20px'}}>Track all jobs you don apply for.</p>
                    {appliedJobs.length === 0 ? (
                        <div style={{background:'white', padding:'50px', textAlign:'center', borderRadius:'14px'}}>
                            <h3>📋 You never apply yet</h3>
                            <p style={{color:'#64748b', marginTop:'8px'}}>Go to Find Jobs tab and apply</p>
                            <button onClick={() => setDashTab("jobs")} style={{marginTop:'16px', background:'#0f766e', color:'white', border:'none', padding:'12px 24px', borderRadius:'10px', cursor:'pointer', fontWeight:'700'}}>Browse Jobs →</button>
                        </div>
                    ) : (
                        <div className="jobs">
                            {appliedJobs.map((app) => (
                                <div className="card" key={app.job.id}>
                                    <div className="logo">{app.job.company[0]}</div>
                                    <h4>{app.job.title}</h4>
                                    <p>{app.job.company} • {app.job.location} • {app.job.type}</p>
                                    <p className="salary">{app.job.salary} / month</p>
                                    <div className="tags"><span style={{background:'#fef3c7', color:'#92400e'}}>🕒 {app.status}</span><span>Applied: {app.date}</span></div>
                                    <div style={{display:'flex', gap:'8px'}}>
                                        <button style={{flex:1}}>View Details</button>
                                        <button onClick={() => setAppliedJobs(appliedJobs.filter(a => a.job.id !== app.job.id))} style={{flex:1, background:'#fee2e2', color:'#991b1b'}}>Withdraw</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            )}
            <footer><h2>Work<span>Naija</span>.</h2><p>Built for Nigerians, by Nigerians. © 2026 WorkNaija</p></footer>
        </div>
    )
}

export default App