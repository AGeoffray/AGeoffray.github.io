This is the Friend Finder app.

You will need to provide a password for mysql before you begin (on the server.js file)

Starting on localhost:3004, the user is directed to a home page with a brief description of the site.

The user can click "Get Started", which will direct them to localhost:3004/directory

From the directory page, the user may choose to "Create a profile" or "View available members"

If they create a profile, they will be redirected to route /survey where they can provide a username and photo.
They will be prompted to fill out a ten question survey. Upon pressing "OK," their answers, name, and photo URL are submitted to the 
SQL 'friend_finder' database into the 'friends' table.

After completing the survey, the user is directed back to the home page.

If they choose to "view available members" they will be directed to the route /allFriends and see names and photos of all members.


I plan to configure this app so that users' answers can be weighed against the answers of others and ranked by compatibility,
but unfortunately I ran out of time. I will upload a newer version when I get that portion completed!
