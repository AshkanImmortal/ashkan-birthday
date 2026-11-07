# Ashkan's birthday invitation

Plain HTML, CSS and JavaScript. No install, build, backend, database or secrets.

The invitation is `index.html`.
RSVPs go directly into an embedded Google Form and its private linked Google Sheet.
The website never claims a response was submitted: Google Forms shows the confirmation after a successful submission.

## Preview

From this directory run `python3 -m http.server 8080 --bind 127.0.0.1`, then open http://127.0.0.1:8080.

## GitHub Pages

The site files live at the root of the public repository.
GitHub Pages uses Deploy from a branch, main, / (root).
All asset paths are relative, so repository subpaths work too.
Push changes to main to update the published invitation.

## Google Form and private responses

`config.js` contains only the published responder URL.
Responses are private. Open the linked Sheet from the form editor's Responses → View in Sheets while signed in.
There is no public guest-list page, published response feed, or response data in the website source.
The form has two required questions: `اسم و فامیلت چیه؟` and `تنها میای یا با همراه؟`.
The latter has exactly `تنها میام` and `با یک همراه میام` as its options.
The response Sheet has automatic totals in E1:F4: responses, companions and total guests.
Keep the companion option text unchanged unless you also update the Sheet's COUNTIF formula.
Do not publish the response Sheet to the web or enable public results summaries.
Totals count responses, plus one extra person for each “با یک همراه میام”. No sign-in means repeat responses cannot be reliably prevented;
review duplicates in the response Sheet. The count does not add Ashkan or other people who haven't submitted a response.

## Event

Thursday, November 19, 2026 (۲۸ آبان ۱۴۰۵), 20:00 Asia/Tehran.
The map uses the supplied Google embed. The direct navigation link uses the pin label's coordinates,
35°44'27.7"N 51°24'04.1"E, rather than the embed's viewport centre.
