# 🎙️ Template: Day 30 Mock Technical Interview Scoring Sheet

> **Usage**: Conduct a 45-minute simulated corporate technical interview with the candidate on Day 30. Score each answer and calculate their placement readiness.

---

## 👤 Candidate Details
- **Candidate Name**: `[Candidate Name]`
- **Date & Time**: `[Date & Time]`
- **Interviewer**: `[Instructor Name]`
- **Target Location**: Hyderabad (HITEC City, Madhapur, Gachibowli)

---

## 📝 4-Round Scoring Matrix

### Round 1: Core Testing Foundations (15 mins — Max: 25 pts)
| Question | Expected Response Focus | Score (1-5) |
| :--- | :--- | :---: |
| 1. Verification vs Validation | Static vs dynamic; SRS review vs test execution | `/5` |
| 2. Regression vs Re-testing | Code fix verification vs side-effect prevention | `/5` |
| 3. ECP & BVA Calculation | Age range [18–60] boundary inputs: 17, 18, 19, 59, 60, 61 | `/5` |
| 4. Defect Life Cycle | Sequence of states (New -> Assigned -> Open -> Fixed -> Retest -> Closed) | `/5` |
| 5. Severity vs Priority Matrix | 4 quadrants, real examples (e.g. logo typo = Low Sev, High Prio) | `/5` |

### Round 2: Situational & Tool Mastery (10 mins — Max: 25 pts)
| Question | Expected Response Focus | Score (1-5) |
| :--- | :--- | :---: |
| 6. "How would you test an ATM machine?" | Functional, non-functional, negative, security, hardware edge cases | `/5` |
| 7. "Dev rejects your bug as 'Works as Expected'" | Reproduce on clean build, check SRS, talk to dev, escalate to PO | `/5` |
| 8. Jira Defect Anatomy | Title, steps, expected vs actual, environment, logs, screenshot | `/5` |
| 9. Agile Scrum ceremonies & 3 standup questions | What tested yesterday, what testing today, blockers | `/5` |
| 10. Smoke vs Sanity Testing | Build stability check vs minor fix verification | `/5` |

### Round 3: SQL & Database Validation (10 mins — Max: 25 pts)
| Question | Expected Response Focus | Score (1-5) |
| :--- | :--- | :---: |
| 11. INNER JOIN vs LEFT JOIN | Matching rows vs all left rows + unmatched NULLs | `/5` |
| 12. Find customers with zero orders | `LEFT JOIN ... WHERE order_id IS NULL` | `/5` |
| 13. WHERE vs HAVING | Row-level filter vs group-level aggregate filter | `/5` |
| 14. DELETE vs TRUNCATE vs DROP | DML rollback vs DDL fast reset vs destroy table structure | `/5` |
| 15. Real UI-to-DB mapping scenario | Verify form submission inserted record into target table | `/5` |

### Round 4: Postman API Testing (10 mins — Max: 25 pts)
| Question | Expected Response Focus | Score (1-5) |
| :--- | :--- | :---: |
| 16. HTTP Methods (GET, POST, PUT, PATCH, DELETE)| Idempotent retrieval vs creation vs replacement vs partial edit | `/5` |
| 17. 401 Unauthorized vs 403 Forbidden | Authentication failure vs lack of permission | `/5` |
| 18. API Bug: 200 OK returned with error payload | Why it is a bug, masking failures, monitoring impact | `/5` |
| 19. Postman Collections & Environments | Reusable test suites, `{{base_url}}` variable switching | `/5` |
| 20. Professional Communication & English Fluency | Confidence, structured answers, eye contact, tone | `/5` |

---

## 📊 Final Scoring & Hiring Verdict

- **Total Score**: `____ / 100`

| Score Range | Verdict | Action Plan |
| :--- | :--- | :--- |
| **85 – 100** | **Ready for Corporate Placement** | Immediate referral to Hyderabad recruitment drives. |
| **70 – 84** | **Conditionally Ready** | 3-day targeted revision on weak areas, re-test. |
| **< 70** | **Needs Additional Practice** | Revisit specific Phase exercises before applying. |

---

## ✍️ Interviewer Summary Notes & Recommendations
*Detail specific advice on what the candidate should refine before live company interviews:*
