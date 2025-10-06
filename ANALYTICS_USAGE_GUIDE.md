# Sophia Analytics Usage Guide

## Overview
This guide shows you how to query and analyze Sophia's performance using the analytics tables in Supabase.

---

## Quick Access to Analytics

### Option 1: Supabase Dashboard
1. Go to your Supabase project dashboard
2. Navigate to **Table Editor**
3. View the following tables:
   - `sophia_questions` - All Q&A interactions
   - `sophia_feedback` - User feedback
   - `sophia_knowledge_gaps` - Questions needing better answers
4. Use the **SQL Editor** for custom queries (see below)

### Option 2: Via SQL Editor
Navigate to SQL Editor in Supabase and run these queries:

---

## Useful Analytics Queries

### 1. Daily Question Volume
```sql
SELECT
  date,
  total_questions,
  claude_questions,
  fallback_questions,
  positive_feedback,
  negative_feedback
FROM sophia_analytics
ORDER BY date DESC
LIMIT 30;
```

### 2. Most Asked Questions
```sql
SELECT
  question,
  COUNT(*) as times_asked,
  AVG(response_length) as avg_response_length
FROM sophia_questions
WHERE created_at > NOW() - INTERVAL '30 days'
GROUP BY question
ORDER BY times_asked DESC
LIMIT 20;
```

### 3. Questions with Negative Feedback
```sql
SELECT
  sq.question,
  sq.response,
  sf.feedback_comment,
  sq.created_at
FROM sophia_questions sq
JOIN sophia_feedback sf ON sq.id = sf.question_id
WHERE sf.feedback_type = 'thumbs_down'
ORDER BY sq.created_at DESC
LIMIT 20;
```

### 4. Top Knowledge Gaps
```sql
SELECT
  question_pattern,
  frequency,
  last_asked,
  avg_response_length,
  negative_feedback_count
FROM sophia_knowledge_gaps
WHERE needs_improvement = true
ORDER BY frequency DESC
LIMIT 20;
```

### 5. Response Quality Metrics
```sql
SELECT
  used_claude_ai,
  COUNT(*) as total_responses,
  AVG(response_length) as avg_length,
  MIN(response_length) as min_length,
  MAX(response_length) as max_length
FROM sophia_questions
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY used_claude_ai;
```

### 6. Questions with Short Responses (Potential Gaps)
```sql
SELECT
  question,
  response,
  response_length,
  created_at
FROM sophia_questions
WHERE response_length < 200
  AND created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;
```

### 7. Hourly Usage Pattern
```sql
SELECT
  EXTRACT(HOUR FROM created_at) as hour_of_day,
  COUNT(*) as question_count
FROM sophia_questions
WHERE created_at > NOW() - INTERVAL '7 days'
GROUP BY hour_of_day
ORDER BY hour_of_day;
```

### 8. Recent Questions by Session
```sql
SELECT
  session_id,
  question,
  response,
  created_at
FROM sophia_questions
WHERE session_id IS NOT NULL
ORDER BY created_at DESC
LIMIT 50;
```

---

## Interpreting the Data

### Response Quality Indicators

**Good Signs:**
- ✅ Average response length > 300 characters
- ✅ Positive feedback ratio > 70%
- ✅ Few questions in knowledge_gaps table
- ✅ Claude AI usage > 90%

**Warning Signs:**
- ⚠️ Average response length < 200 characters
- ⚠️ Negative feedback ratio > 30%
- ⚠️ Many repeated questions in knowledge_gaps
- ⚠️ High fallback (non-Claude) usage

### Knowledge Gap Priority

**High Priority** (Fix immediately):
- Frequency > 10
- Negative feedback count > 3
- Average response length < 150

**Medium Priority** (Fix soon):
- Frequency 5-10
- Negative feedback count 1-2
- Average response length 150-250

**Low Priority** (Monitor):
- Frequency < 5
- No negative feedback
- Average response length > 250

---

## Weekly Review Process

### Step 1: Check Overall Volume
```sql
SELECT * FROM sophia_analytics
WHERE date > NOW() - INTERVAL '7 days'
ORDER BY date DESC;
```

### Step 2: Identify Problem Questions
```sql
-- Questions with low satisfaction
SELECT
  sq.question,
  COUNT(CASE WHEN sf.feedback_type = 'thumbs_up' THEN 1 END) as positive,
  COUNT(CASE WHEN sf.feedback_type = 'thumbs_down' THEN 1 END) as negative
FROM sophia_questions sq
LEFT JOIN sophia_feedback sf ON sq.id = sf.question_id
WHERE sq.created_at > NOW() - INTERVAL '7 days'
GROUP BY sq.question
HAVING COUNT(CASE WHEN sf.feedback_type = 'thumbs_down' THEN 1 END) > 0
ORDER BY negative DESC;
```

### Step 3: Review Knowledge Gaps
```sql
SELECT * FROM sophia_knowledge_gaps
WHERE needs_improvement = true
  AND frequency >= 3
ORDER BY frequency DESC;
```

### Step 4: Sample Recent Interactions
```sql
-- Random sample of 10 recent Q&As for quality check
SELECT question, response, response_length
FROM sophia_questions
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY RANDOM()
LIMIT 10;
```

---

## Improving Based on Analytics

### For Frequent Questions with Short Responses
1. Check the knowledge base for that topic
2. Add more detail or examples
3. Ensure automation triggers are explicit
4. Add the improved content to the knowledge base

### For Questions with Negative Feedback
1. Review the actual response that was given
2. Compare to the knowledge base content
3. Check if the system prompt needs adjustment
4. Consider adding a specific Q&A pair for that question

### For Knowledge Gaps
1. Export the top 10 knowledge gaps
2. Research the correct answers
3. Add comprehensive Q&A pairs to the knowledge base
4. Test the new responses

---

## Exporting Data

### Export All Questions (CSV)
In Supabase SQL Editor:
```sql
COPY (
  SELECT
    question,
    response,
    response_length,
    used_claude_ai,
    created_at
  FROM sophia_questions
  WHERE created_at > NOW() - INTERVAL '30 days'
  ORDER BY created_at DESC
) TO STDOUT WITH CSV HEADER;
```

### Export Knowledge Gaps for Review
```sql
COPY (
  SELECT
    question_pattern,
    frequency,
    last_asked,
    avg_response_length
  FROM sophia_knowledge_gaps
  WHERE needs_improvement = true
  ORDER BY frequency DESC
) TO STDOUT WITH CSV HEADER;
```

---

## Setting Up Alerts (Optional)

### Create a Daily Summary Function
```sql
CREATE OR REPLACE FUNCTION daily_analytics_summary()
RETURNS TABLE (
  metric text,
  value numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT 'Total Questions'::text, COUNT(*)::numeric
  FROM sophia_questions
  WHERE created_at::date = CURRENT_DATE
  UNION ALL
  SELECT 'Positive Feedback'::text, COUNT(*)::numeric
  FROM sophia_feedback
  WHERE feedback_type = 'thumbs_up'
    AND created_at::date = CURRENT_DATE
  UNION ALL
  SELECT 'Negative Feedback'::text, COUNT(*)::numeric
  FROM sophia_feedback
  WHERE feedback_type = 'thumbs_down'
    AND created_at::date = CURRENT_DATE
  UNION ALL
  SELECT 'New Knowledge Gaps'::text, COUNT(*)::numeric
  FROM sophia_knowledge_gaps
  WHERE created_at::date = CURRENT_DATE;
END;
$$ LANGUAGE plpgsql;
```

Run it:
```sql
SELECT * FROM daily_analytics_summary();
```

---

## Maintenance Tasks

### Weekly
- Review knowledge gaps table
- Check negative feedback
- Verify response quality with random samples

### Monthly
- Analyze trends in sophia_analytics view
- Export and archive old questions (optional)
- Update knowledge base based on gaps

### Quarterly
- Comprehensive review of all analytics
- Decide if database-backed semantic search is needed
- Evaluate ROI of analytics tracking

---

## Need Help?

### Common Issues

**No data appearing:**
- Check that questions are being logged (console logs in browser)
- Verify Supabase connection is working
- Check RLS policies aren't blocking inserts

**Analytics view empty:**
- Ensure base tables have data
- Refresh the view: `REFRESH MATERIALIZED VIEW sophia_analytics;` (if it were materialized)

**High negative feedback:**
- Review the actual questions and responses
- Consider enhancing system prompt
- Add more specific examples to knowledge base

---

## Quick Win: Find Your Top 5 Improvements

Run this query to get your immediate action items:
```sql
SELECT
  question_pattern as "Question",
  frequency as "Times Asked",
  avg_response_length as "Avg Response Length",
  CASE
    WHEN avg_response_length < 150 THEN 'Add more detail'
    WHEN avg_response_length < 250 THEN 'Add examples'
    ELSE 'Review for accuracy'
  END as "Recommended Action"
FROM sophia_knowledge_gaps
WHERE needs_improvement = true
ORDER BY frequency DESC
LIMIT 5;
```

This gives you the 5 most important knowledge base updates to make.
