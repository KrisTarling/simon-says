Fully-functioning Simon game based on the 1978 original.
======

Defeat level 20 by repeating the tunes to win.
Play on 'strict' mode for an added challenge - no mistakes allowed!
Game speed increases at levels 5 and 10.

#Version 1.1

###gameplay
- fixed bug with strict mode
- added more information to digital display
- altered user lockout time to allow speedier button presses
- button effects stop on mouseup (after very short delay to simulate a physical button)
- added copious annotation & explanation to code

#Version 1.2

### improved graphics:
- game now positioned in center of window
- added subtle lightbulb glow inside buttons
- added border detail to brand area
- buttons now move when pressed
- altered ON/OFF switch appearance
- various shadow/border alterations for realism
- altered 'm' in the branding to lower case

###gameplay
- overall game speed increased
- game speed now increments at higher levels
- fixed bug which allowed user to mess with Simon's turn
- display now flashes to indicate if response sequence was correct

#Version 1.3

### optimizations
- small improvements for mobile devices - more to come


#Wishlist for Future Updates

- audio toggle switch
- add more audio sources for compatibility/fallback
- display '888' LED effect to be present under numbers for realism
- flash STR to display when Strict mode is enabled
- add 'cheat' mode which displays the color sequence
- log high score
- improve mobile and browser compatibility
- add to GitHub
- free play mode - allow user to play to 999 
- make game larger for mobile devices
- add more background atmosphere for retro charm
- some kind of logo might be nice

#Known Issues

###minor issues:
- display will show '01' if game is turned off immediately after start
- green not is flat and yellow note is sharp
- on/off switch displays incorrectly in debug mode in some chrome browsers
- you can cheat your way to level 5+ by rapidly mashing the start button
- the display blink has no cleartimeout to prevent odd behaviour

#Fixed Issues
~~pressing buttons very quickly can overlap the cutouts and kill the next tone~~
~~pressing buttons while simon is playing sometimes causes him to skip notes~~

#More Info
- game made as part of the freecodecamp.com course

- if you find any bugs, please leave a comment and I will fix it.
- if you have suggestions for improving code, please tell me, I'm still learning