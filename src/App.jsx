import { useState, useEffect } from 'react'

function App() {
    const [page, setPage] = useState(() => localStorage.getItem('worknaija_page') || "landing")
    const [dashTab, setDashTab] = useState("jobs")
    const [searchText, setSearchText] = useState("")
    const [locationText, setLocationText] = useState("")
    const [typeFilter, setTypeFilter] = useState("All")
    const [salaryFilter, setSalaryFilter] = useState("Any")
    const [appliedJobs, setAppliedJobs] = useState(() => {
        try { return JSON.parse(localStorage.getItem('worknaija_applied') || '[]') } catch { return [] }
    })
    const [savedJobs, setSavedJobs] = useState(() => {
        try { return JSON.parse(localStorage.getItem('worknaija_saved') || '[]') } catch { return [] }
    })
    const [selectedJob, setSelectedJob] = useState(null)
    const [email, setEmail] = useState(() => localStorage.getItem('worknaija_email') || "")

    // SAVE TO BROWSER - e go remember you
    useEffect(() => { localStorage.setItem('worknaija_saved', JSON.stringify(savedJobs)) }, [savedJobs])
    useEffect(() => { localStorage.setItem('worknaija_applied', JSON.stringify(appliedJobs)) }, [appliedJobs])
    useEffect(() => { localStorage.setItem('worknaija_email', email) }, [email])
    useEffect(() => { localStorage.setItem('worknaija_page', page) }, [page])
    const [password, setPassword] = useState("")

    const jobs = [
        { id: 1, title: "Frontend Developer", company: "Paystack", location: "Lagos", type: "Hybrid", salary: "₦400k - ₦600k", salaryMin: 400, tag: "Full-time", hot: true, category: "Tech & Engineering", desc: "Build beautiful, fast payment pages used by millions of Nigerians.", reqs: ["2+ years React", "Strong CSS / Tailwind", "Know Git & GitHub"] },
        { id: 2, title: "UI Designer", company: "Flutterwave", location: "Remote", type: "Remote", salary: "₦350k - ₦500k", salaryMin: 350, tag: "Remote", hot: false, category: "Design & Creative", desc: "Design clean dashboards and mobile flows.", reqs: ["Figma expert", "Portfolio of 3+ projects"] },
        { id: 3, title: "Customer Support", company: "Kuda Bank", location: "Abuja", type: "Onsite", salary: "₦180k - ₦220k", salaryMin: 180, tag: "Full-time", hot: false, category: "Finance & Accounting", desc: "Help customers solve account issues quickly.", reqs: ["Good English", "Patient & friendly"] },
        { id: 4, title: "Backend Engineer", company: "Moniepoint", location: "Lagos", type: "Hybrid", salary: "₦500k - ₦750k", salaryMin: 500, tag: "Full-time", hot: true, category: "Tech & Engineering", desc: "Build APIs that power payments.", reqs: ["Node.js or Python", "Know databases"] },
        { id: 5, title: "Product Manager", company: "PiggyVest", location: "Lagos", type: "Remote", salary: "₦600k - ₦900k", salaryMin: 600, tag: "Remote", hot: false, category: "Tech & Engineering", desc: "Lead savings features from idea to launch.", reqs: ["3+ years product", "Data-driven"] },
        { id: 6, title: "Social Media Manager", company: "Chowdeck", location: "Lagos", type: "Onsite", salary: "₦200k - ₦300k", salaryMin: 200, tag: "Contract", hot: false, category: "Marketing & Sales", desc: "Grow Chowdeck on Instagram, TikTok and X.", reqs: ["Know TikTok / Reels", "Creative"] },
        { id: 7, title: "Marketing Lead", company: "Paystack", location: "Abuja", type: "Hybrid", salary: "₦450k - ₦650k", salaryMin: 450, tag: "Full-time", hot: false, category: "Marketing & Sales", desc: "Lead campaigns to bring new businesses.", reqs: ["3+ years marketing", "Know digital ads"] },
        { id: 8, title: "Graphic Designer", company: "Flutterwave", location: "Remote", type: "Remote", salary: "₦250k - ₦400k", salaryMin: 250, tag: "Contract", hot: false, category: "Design & Creative", desc: "Create visuals for campaigns.", reqs: ["Photoshop / Figma", "Creative portfolio"] },
        { id: 9, title: "Accountant", company: "Kuda Bank", location: "Lagos", type: "Onsite", salary: "₦300k - ₦450k", salaryMin: 300, tag: "Full-time", hot: false, category: "Finance & Accounting", desc: "Manage accounts and reports.", reqs: ["ICAN / ACCA advantage", "Excel expert"] },
        { id: 10, title: "Data Analyst", company: "Moniepoint", location: "Lagos", type: "Hybrid", salary: "₦350k - ₦550k", salaryMin: 350, tag: "Full-time", hot: true, category: "Tech & Engineering", desc: "Turn data to insights.", reqs: ["SQL / Excel / Python", "Know dashboards"] },
        { id: 11, title: "Content Writer", company: "PiggyVest", location: "Remote", type: "Remote", salary: "₦150k - ₦250k", salaryMin: 150, tag: "Contract", hot: false, category: "Marketing & Sales", desc: "Write blog posts and newsletters.", reqs: ["Good writing", "SEO basics"] },
        { id: 12, title: "Mobile Developer", company: "Chowdeck", location: "Lagos", type: "Onsite", salary: "₦450k - ₦700k", salaryMin: 450, tag: "Full-time", hot: true, category: "Tech & Engineering", desc: "Build Chowdeck app.", reqs: ["Flutter / React Native", "2+ years mobile"] },
        { id: 13, title: "HR Officer", company: "Kuda Bank", location: "Abuja", type: "Onsite", salary: "₦220k - ₦300k", salaryMin: 220, tag: "Full-time", hot: false, category: "Finance & Accounting", desc: "Handle recruitment and onboarding.", reqs: ["HR degree / CIPM", "Good people skills"] },
        { id: 14, title: "Video Editor", company: "Flutterwave", location: "Remote", type: "Remote", salary: "₦200k - ₦350k", salaryMin: 200, tag: "Contract", hot: false, category: "Design & Creative", desc: "Edit Reels, ads and product videos.", reqs: ["Premiere Pro / CapCut", "Creative eye"] },
        { id: 15, title: "Sales Executive", company: "Moniepoint", location: "Port Harcourt", type: "Onsite", salary: "₦180k - ₦280k", salaryMin: 180, tag: "Full-time", hot: false, category: "Marketing & Sales", desc: "Bring new merchants to Moniepoint.", reqs: ["Good talking skills", "Target driven"] },
    ];

    const filteredJobs = jobs.filter((job) => {
        const matchText = job.title.toLowerCase().includes(searchText.toLowerCase()) || job.company.toLowerCase().includes(searchText.toLowerCase()) || job.category.toLowerCase().includes(searchText.toLowerCase());
        const matchLocation = job.location.toLowerCase().includes(locationText.toLowerCase());
        const matchType = typeFilter === "All" || job.type === typeFilter;
        const matchSalary = salaryFilter === "Any" || job.salaryMin >= Number(salaryFilter);
        return matchText && matchLocation && matchType && matchSalary;
    });

    const isApplied = (id) => appliedJobs.some(a => a.job.id === id)
    const isSaved = (id) => savedJobs.some(j => j.id === id)
    const toggleSave = (job) => {
        if (isSaved(job.id)) setSavedJobs(savedJobs.filter(j => j.id !== job.id))
        else setSavedJobs([job, ...savedJobs])
    }
    const handleApply = (job) => {
        if (isApplied(job.id)) { setSelectedJob(null); setDashTab("applications"); return }
        setAppliedJobs([{ job, status: "Under Review", date: new Date().toLocaleDateString('en-NG', { day: 'numeric', month: 'short', year: 'numeric' }) }, ...appliedJobs])
        setSelectedJob(null); setDashTab("applications")
    }
    const handleLogin = (e) => {
        e.preventDefault()
        if (!email || !password) { alert("Put email and password"); return }
        setPage("dashboard"); setDashTab("jobs")
    }
    const handleLogout = () => {
        setPage("landing")
        localStorage.removeItem('worknaija_page')
    }
    const clearAll = () => { setSearchText(""); setLocationText(""); setTypeFilter("All"); setSalaryFilter("Any") }

    if (page === "landing") {
        return (
            <div className="page">
                <header className="header"><h1>Work<span>Naija</span><span className="dot">.</span></h1>
                    <nav><a href="#" onClick={(e) => {e.preventDefault(); setPage("login")}}>Find Jobs</a><a href="#">Companies</a><a href="#">Career Guide</a><a href="#" className="login" onClick={(e) => {e.preventDefault(); setPage("login")}}>Log in</a><button onClick={() => setPage("login")}>Post a Job - It's Free</button></nav></header>
                <main className="hero">
                    <div className="badge">🔥 2,482 new jobs this week in Nigeria</div>
                    <h2>Find Work Wey <span>Fit You</span><br/>For Naija</h2>
                    <p>Real jobs from verified companies. No scam. No wahala. Apply in 2 minutes.</p>
                    <div className="search"><input placeholder="🔍 Job title, skill or company" value={searchText} onChange={(e) => setSearchText(e.target.value)} /><input placeholder="📍 Lagos, Abuja, Remote..." value={locationText} onChange={(e) => setLocationText(e.target.value)} /><button onClick={() => setPage("login")}>Search Jobs →</button></div>
                    <div className="stats"><div><b>12,400+</b><span>Active Jobs</span></div><div><b>850+</b><span>Verified Companies</span></div><div><b>96%</b><span>Response Rate</span></div></div>
                </main>
                <section className="trusted">Trusted by teams at <b>Paystack</b> • <b>Flutterwave</b> • <b>Kuda</b> • <b>Moniepoint</b> • <b>PiggyVest</b> • <b>Chowdeck</b></section>
                <section className="section"><h3>Browse by Category</h3><div className="cats"><div onClick={() => setPage("login")} style={{cursor:'pointer'}}>💻 Tech & Engineering <span>Login to view</span></div><div onClick={() => setPage("login")} style={{cursor:'pointer'}}>🎨 Design & Creative <span>Login to view</span></div><div onClick={() => setPage("login")} style={{cursor:'pointer'}}>📈 Marketing & Sales <span>Login to view</span></div><div onClick={() => setPage("login")} style={{cursor:'pointer'}}>💰 Finance & Accounting <span>Login to view</span></div></div></section>
                <section className="how"><h3>How WorkNaija Works</h3><div className="steps"><div><b>1. Create Profile</b><p>Add your skills, CV in 2 mins</p></div><div><b>2. Apply</b><p>One click apply to verified jobs</p></div><div><b>3. Get Hired</b><p>Chat directly with recruiter</p></div></div></section>
                <footer><h2>Work<span>Naija</span>.</h2><p>Built for Nigerians, by Nigerians. © 2026 WorkNaija</p></footer>
            </div>
        )
    }

    if (page === "login") {
        return (
            <div className="page">
                <header className="header"><h1 onClick={() => setPage("landing")} style={{cursor:'pointer'}}>Work<span>Naija</span><span className="dot">.</span></h1><nav><a href="#" onClick={(e) => {e.preventDefault(); setPage("landing")}}>← Back Home</a></nav></header>
                <main style={{maxWidth:'420px', margin:'60px auto', background:'white', padding:'30px', borderRadius:'16px'}}><h2 style={{fontSize:'26px'}}>Welcome back 👋</h2><p style={{color:'#64748b', margin:'8px 0 20px'}}>Login to see jobs & track applications</p>
                    <form onSubmit={handleLogin} style={{display:'flex', flexDirection:'column', gap:'12px'}}><input placeholder="Email - e.g. you@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} style={{padding:'14px', borderRadius:'10px', border:'1px solid #e2e8f0'}} /><input type="password" placeholder="Password - anything" value={password} onChange={(e) => setPassword(e.target.value)} style={{padding:'14px', borderRadius:'10px', border:'1px solid #e2e8f0'}} /><button type="submit" style={{background:'#0f766e', color:'white', border:'none', padding:'14px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>Log In → Go to Dashboard</button></form>
                </main>
            </div>
        )
    }

    return (
        <div className="page">
            <header className="header"><h1 onClick={() => setPage("landing")} style={{cursor:'pointer'}}>Work<span>Naija</span><span className="dot">.</span></h1>
                <nav><a href="#" onClick={(e) => {e.preventDefault(); setDashTab("jobs")}}>Find Jobs</a><a href="#" onClick={(e) => {e.preventDefault(); setDashTab("applications")}}>My Applications {appliedJobs.length > 0 && `(${appliedJobs.length})`}</a><a href="#" onClick={(e) => {e.preventDefault(); setDashTab("saved")}}>❤️ Saved {savedJobs.length > 0 && `(${savedJobs.length})`}</a><a href="#" className="login" onClick={(e) => {e.preventDefault(); handleLogout()}}>Log out</a><button>Hi, {email.split('@')[0] || 'User'} 👋</button></nav></header>

            <section className="section">
                <h3>Welcome to your Dashboard 🎉</h3>
                <p style={{color:'#64748b', marginTop:'6px'}}>Applied: <b>{appliedJobs.length}</b> • Saved: <b>{savedJobs.length}</b> • Total Jobs: <b>15</b> • Your data is saved automatically ✅</p>
                <div style={{display:'flex', gap:'10px', marginTop:'16px', flexWrap:'wrap'}}>
                    <button onClick={() => setDashTab("jobs")} style={{padding:'10px 20px', borderRadius:'20px', border:'none', cursor:'pointer', background: dashTab === 'jobs' ? '#0f766e' : '#e2e8f0', color: dashTab === 'jobs' ? 'white' : '#0f172a', fontWeight:'700'}}>🔍 Find Jobs</button>
                    <button onClick={() => setDashTab("applications")} style={{padding:'10px 20px', borderRadius:'20px', border:'none', cursor:'pointer', background: dashTab === 'applications' ? '#0f766e' : '#e2e8f0', color: dashTab === 'applications' ? 'white' : '#0f172a', fontWeight:'700'}}>📋 My Applications ({appliedJobs.length})</button>
                    <button onClick={() => setDashTab("saved")} style={{padding:'10px 20px', borderRadius:'20px', border:'none', cursor:'pointer', background: dashTab === 'saved' ? '#0f766e' : '#e2e8f0', color: dashTab === 'saved' ? 'white' : '#0f172a', fontWeight:'700'}}>❤️ Saved ({savedJobs.length})</button>
                </div>
            </section>

            {dashTab === "jobs" && (
                <section className="section">
                    <div className="search"><input placeholder="🔍 Job title, skill or company" value={searchText} onChange={(e) => setSearchText(e.target.value)} /><input placeholder="📍 Lagos, Abuja, Remote..." value={locationText} onChange={(e) => setLocationText(e.target.value)} /><button>Search Jobs →</button></div>
                    <div style={{display:'flex', gap:'10px', marginTop:'16px', flexWrap:'wrap', alignItems:'center', background:'white', padding:'14px', borderRadius:'12px'}}>
                        <span style={{fontWeight:'700', fontSize:'14px'}}>Filter:</span>
                        <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)} style={{padding:'10px 12px', borderRadius:'10px', border:'1px solid #e2e8f0', fontWeight:'600', cursor:'pointer'}}><option value="All">All Types</option><option value="Remote">🌍 Remote Only</option><option value="Hybrid">🏠 Hybrid</option><option value="Onsite">🏢 Onsite</option></select>
                        <select value={salaryFilter} onChange={(e) => setSalaryFilter(e.target.value)} style={{padding:'10px 12px', borderRadius:'10px', border:'1px solid #e2e8f0', fontWeight:'600', cursor:'pointer'}}><option value="Any">Any Salary</option><option value="200">💰 ₦200k+ / month</option><option value="350">💰 ₦350k+ / month</option><option value="500">💰 ₦500k+ / month</option></select>
                        {(typeFilter !== "All" || salaryFilter !== "Any" || searchText || locationText) && <button onClick={clearAll} style={{background:'#fee2e2', color:'#991b1b', border:'none', padding:'10px 16px', borderRadius:'10px', fontWeight:'700', cursor:'pointer'}}>✕ Clear All Filters</button>}
                        <span style={{marginLeft:'auto', fontSize:'13px', color:'#64748b', fontWeight:'600'}}>{filteredJobs.length} jobs match</span>
                    </div>
                    <div className="section-head" style={{marginTop:'20px'}}><h3>Featured Jobs ({filteredJobs.length} found)</h3><a href="#" onClick={() => clearAll()}>Clear filter →</a></div>
                    {filteredJobs.length === 0 ? (<div style={{background:'white', padding:'50px', textAlign:'center', borderRadius:'14px'}}><h3>No job match your filter 😢</h3><button onClick={clearAll} style={{marginTop:'16px', background:'#0f766e', color:'white', border:'none', padding:'12px 24px', borderRadius:'10px', cursor:'pointer', fontWeight:'700'}}>Show All Jobs</button></div>) : (
                        <div className="jobs">{filteredJobs.map((job) => (<div className="card" key={job.id} onClick={() => setSelectedJob(job)} style={{cursor:'pointer'}}>{job.hot && <span className="hot">🔥 HOT</span>}<div style={{display:'flex', justifyContent:'space-between'}}><div className="logo">{job.company[0]}</div><button onClick={(e) => {e.stopPropagation(); toggleSave(job)}} style={{background:'none', border:'none', fontSize:'22px', cursor:'pointer'}}>{isSaved(job.id) ? "❤️" : "🤍"}</button></div><h4>{job.title}</h4><p>{job.company} • {job.location} • {job.type}</p><p className="salary">{job.salary} / month</p><div className="tags"><span>{job.tag}</span><span>{job.category}</span></div><button onClick={(e) => {e.stopPropagation(); setSelectedJob(job)}}>View Details →</button></div>))}</div>)}
                </section>
            )}

            {dashTab === "applications" && (
                <section className="section" style={{minHeight:'50vh'}}><h3>My Applications ({appliedJobs.length})</h3>
                    {appliedJobs.length === 0 ? (<div style={{background:'white', padding:'50px', textAlign:'center', borderRadius:'14px', marginTop:'16px'}}><h3>📋 You never apply yet</h3><button onClick={() => setDashTab("jobs")} style={{marginTop:'16px', background:'#0f766e', color:'white', border:'none', padding:'12px 24px', borderRadius:'10px', cursor:'pointer', fontWeight:'700'}}>Browse Jobs →</button></div>) : (
                        <div className="jobs" style={{marginTop:'16px'}}>{appliedJobs.map((app) => (<div className="card" key={app.job.id} onClick={() => setSelectedJob(app.job)} style={{cursor:'pointer'}}><div className="logo">{app.job.company[0]}</div><h4>{app.job.title}</h4><p>{app.job.company} • {app.job.location} • {app.job.type}</p><p className="salary">{app.job.salary} / month</p><div className="tags"><span style={{background:'#fef3c7', color:'#92400e'}}>🕒 {app.status}</span><span>Applied: {app.date}</span></div><div style={{display:'flex', gap:'8px'}}><button onClick={(e) => {e.stopPropagation(); setSelectedJob(app.job)}} style={{flex:1}}>View Details</button><button onClick={(e) => {e.stopPropagation(); setAppliedJobs(appliedJobs.filter(a => a.job.id !== app.job.id))}} style={{flex:1, background:'#fee2e2', color:'#991b1b'}}>Withdraw</button></div></div>))}</div>)}
                </section>
            )}

            {dashTab === "saved" && (
                <section className="section" style={{minHeight:'50vh'}}><h3>❤️ Saved Jobs ({savedJobs.length})</h3>
                    {savedJobs.length === 0 ? (<div style={{background:'white', padding:'50px', textAlign:'center', borderRadius:'14px', marginTop:'16px'}}><h3>🤍 No saved jobs yet</h3><button onClick={() => setDashTab("jobs")} style={{marginTop:'16px', background:'#0f766e', color:'white', border:'none', padding:'12px 24px', borderRadius:'10px', cursor:'pointer', fontWeight:'700'}}>Browse Jobs →</button></div>) : (
                        <div className="jobs" style={{marginTop:'16px'}}>{savedJobs.map((job) => (<div className="card" key={job.id} onClick={() => setSelectedJob(job)} style={{cursor:'pointer'}}><div style={{display:'flex', justifyContent:'space-between'}}><div className="logo">{job.company[0]}</div><button onClick={(e) => {e.stopPropagation(); toggleSave(job)}} style={{background:'none', border:'none', fontSize:'22px', cursor:'pointer'}}>❤️</button></div><h4>{job.title}</h4><p>{job.company} • {job.location} • {job.type}</p><p className="salary">{job.salary} / month</p><div className="tags"><span>{job.tag}</span><span>{job.category}</span></div><div style={{display:'flex', gap:'8px'}}><button onClick={(e) => {e.stopPropagation(); handleApply(job)}} style={{flex:1}}>{isApplied(job.id) ? "Applied ✓" : "Apply Now →"}</button><button onClick={(e) => {e.stopPropagation(); toggleSave(job)}} style={{flex:1, background:'#fee2e2', color:'#991b1b'}}>Remove</button></div></div>))}</div>)}
                </section>
            )}

            {selectedJob && (
                <div onClick={() => setSelectedJob(null)} style={{position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', display:'flex', alignItems:'center', justifyContent:'center', zIndex:100, padding:'16px'}}>
                    <div onClick={(e) => e.stopPropagation()} style={{background:'white', maxWidth:'560px', width:'100%', maxHeight:'90vh', overflowY:'auto', borderRadius:'18px', padding:'28px', position:'relative'}}>
                        <button onClick={() => setSelectedJob(null)} style={{position:'absolute', top:'16px', right:'16px', border:'none', background:'#f1f5f9', padding:'8px 12px', borderRadius:'100px', cursor:'pointer', fontWeight:'700'}}>✕ Close</button>
                        <div style={{display:'flex', gap:'14px', alignItems:'center'}}><div className="logo" style={{width:'64px', height:'64px', fontSize:'28px'}}>{selectedJob.company[0]}</div><div><h2 style={{fontSize:'24px'}}>{selectedJob.title}</h2><p style={{color:'#64748b', marginTop:'4px'}}>{selectedJob.company} • {selectedJob.location} • {selectedJob.type}</p></div></div>
                        <p className="salary" style={{fontSize:'20px', marginTop:'16px'}}>{selectedJob.salary} / month</p>
                        <div className="tags" style={{marginTop:'10px'}}><span>{selectedJob.tag}</span><span>{selectedJob.category}</span>{selectedJob.hot && <span style={{background:'#fee2e2', color:'#991b1b'}}>🔥 HOT</span>}</div>
                        <h3 style={{marginTop:'22px'}}>About this role</h3><p style={{color:'#334155', lineHeight:'1.7', marginTop:'8px'}}>{selectedJob.desc}</p>
                        <h3 style={{marginTop:'20px'}}>What you need</h3><ul style={{margin:'10px 0 20px 18px', lineHeight:'1.9', color:'#334155'}}>{selectedJob.reqs.map(r => <li key={r}>{r}</li>)}</ul>
                        <div style={{display:'flex', gap:'10px', marginTop:'20px'}}><button onClick={() => handleApply(selectedJob)} style={{flex:2, background: isApplied(selectedJob.id) ? '#e2e8f0' : '#0f766e', color: isApplied(selectedJob.id) ? '#0f172a' : 'white', border:'none', padding:'14px', borderRadius:'12px', fontWeight:'800', cursor:'pointer'}}>{isApplied(selectedJob.id) ? "Applied ✓" : "Apply Now →"}</button><button onClick={() => toggleSave(selectedJob)} style={{flex:1, background: isSaved(selectedJob.id) ? '#fee2e2' : 'white', color: isSaved(selectedJob.id) ? '#991b1b' : '#0f172a', border:'1px solid #e2e8f0', padding:'14px', borderRadius:'12px', fontWeight:'700', cursor:'pointer'}}>{isSaved(selectedJob.id) ? "❤️ Saved" : "🤍 Save"}</button></div>
                    </div>
                </div>
            )}
            <footer><h2>Work<span>Naija</span>.</h2><p>Built for Nigerians, by Nigerians. © 2026 WorkNaija</p></footer>
        </div>
    )
}

export default App