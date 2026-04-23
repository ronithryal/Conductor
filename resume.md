                                                                                                                       
⏺ On "run the API or the web app" — that was poorly worded on my part. You need both running at the same time, not one 
  or the other. Two terminals:                                                                                         
                                                                                                                       
  # Terminal 1 — starts the Fastify backend on port 3001
  cd /Users/ronith/Conductor/apps/api && pnpm dev                                                                      
                                                                                                                       
  # Terminal 2 — starts the Vite frontend on port 5173                                                                 
  cd /Users/ronith/Conductor/apps/web && pnpm dev                                                                      
                                                            
  Or from the repo root, one command starts both:                                                                      
   
  cd /Users/ronith/Conductor && pnpm dev                                                                               
                                                            
  The web app proxies /api/* calls to localhost:3001, so if the API isn't running, clicking Run will silently fail.    
   
  ---                                                                                                                  
  Good tests to run, roughly in order of importance:        
                                                                                                                       
  1. TypeScript — catches broken code before you open a browser
  cd apps/web && npx tsc --noEmit                                                                                      
  cd apps/api && npx tsc --noEmit                           
  Both should return nothing (zero errors).                                                                            
                                                            
  2. API smoke tests — verify the backend is healthy                                                                   
  curl http://localhost:3001/health                                                                                    
  curl http://localhost:3001/api/templates
  Health should return {"ok":true}. Templates should return all three template objects.                                
                                                                                                                       
  3. Full SSE stream — the most important backend test                                                                 
  # POST a run, grab the runId                                                                                         
  curl -s -X POST http://localhost:3001/api/runs \                                                                     
    -H "Content-Type: application/json" \                                                                              
    -d '{"templateId":"email-triage","isRetry":false}'                                                                 
                                                      
  # Then stream it (replace the ID)                                                                                    
  curl -N http://localhost:3001/api/runs/<runId>/stream                                                                
  Watch for run.node.failed on research-1 at ~12.5s, then the stream closes.
                                                                                                                       
  4. Browser golden path — the actual demo                                                                             
                                                                                                                       
  Open http://localhost:5174, then:                                                                                    
  - Click "Browse Templates" → install Email Triage Agent   
  - Click the Research Agent node → inspector slides open, shows model + tools                                         
  - Close inspector → click Run                                               
  - Watch nodes animate left to right                                                                                  
  - Research Agent turns red at ~12s, error panel appears in Run Feed                                                  
  - Click Retry → nodes continue, Report Generator completes                                                           
  - Click Dashboard tab → KPI cards and chart are visible                                                              
                                                                                                                       
  If all of that flows without a hitch, the demo is ready to record.                                                   
                                                                                                                       
  5. Viewport size check                                                                                               
  Resize your browser to 1280×800 before recording — that's a common laptop resolution and it's what the video will be 
  captured at. Make sure no layout breaks at that size.  
