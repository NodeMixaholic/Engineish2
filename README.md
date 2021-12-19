# OpenBloxEngine
Open source ROBLOX-like engine, making it easier for devs to transition their games outside ROBLOX.
Each script will be a function with the same name, interpreted as JS code. Additional functions will be enclosed within functions with name pattern `${SCRIPTNAME}${FUNCNAME}`.
IntValues, StringValues, and BoolValues will be stored as variables with the same names in the script interpreting function. Objects interpreted as bricks or spheres will be placed in the Workspace dictonary, for instance: `partWorkspace = {"spheres":["part1","infoSphere"."metaSphere","hackerSphere","part3"],"bricks":["part2","Baseplate"]}`


## Valid scripting examples..
`newInstance("Script") --will automatically create a function in the script interpriting function with a numbered id ranging from OBSCRIPT1 on up.`

`newInstance("ForceField") --creates new forcefield around the player`

`newInstance("Part") --creates new Part at Vector3.new(0,0,0)`

`newInstance("Part").move(1,2,3) --creates new Part at Vector3.new(1,2,3)`

`baseplate = newInstance("Part").resize(5,5,5) --creates a reference 'baseplate' to a new part and resizes it.`

`player.localHealthh = 0 --Kills the player`

`player.localHealth = math.huge --Gods the player`

`player.localJumpPower = 50 --Default JumpPower`

`player.localWalkSpeed = 16 --Default WalkSpeed`

`teleportService.changePlace('XML') //changes place to desired XML code.`


# FAQ
## Help! My scripts don't work!
*Be sure you are treating all scripts as old ROBLOX code with the new functions, except for RemoteEvent functions.* This means, for example, you dont FireServer for money, you just set the intvalue directly. If it still doesnt work, I havent implemented the function yet.

## Why arent my Decals/Music/Sounds available!?!
Due to certain ROBLOX EULA restrictions, this app cannot download assets from their site.

## Is this any way referenced from the ROBLOX source code?
No! In fact, I've made this completely from years of knowledge of ROBLOX place and web backend development. This is probably my greatest work yet.

## So give me a few words that describes this simply, none of that developer jargon.
An easy to use, sane game engine for some. A neat way to escape from ROBLOX's grasp for most.
