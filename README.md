# NodeBlox
Open source ROBLOX-like, javascript first engine. Making it easier for devs to transition their games outside ROBLOX.

## Valid scripting examples..
`newInstance("Function") //will automatically create a function in the script interpriting function with a numbered id ranging from OBFUNC1 on up.`

`newInstance("ForceField") //creates new forcefield around the player`

`newInstance("Part") //creates new Part at Vector3.new(0,0,0)`

`newInstance("Part").move(1,2,3) //creates new Part at Vector3.new(1,2,3)`

`baseplate = newInstance("Part").resize(5,5,5) //creates a reference 'baseplate' to a new part and resizes it.`

`player.localHealth = 0 //Kills the player`

`player.localHealth = math.huge //Gods the player`

`player.localJumpPower = 50 //Default JumpPower`

`player.localWalkSpeed = 16 //Default WalkSpeed`

`teleportService.changePlace('XML') //changes place to desired XML code.`

`player.Teleport(128,15,300) //teleports the player`

`newInstance("LeaderboardStat").value(128)`


# FAQ

## Is this any way referenced from the ROBLOX source code?
No! In fact, I've made this completely from years of knowledge of ROBLOX place and web backend development. This is probably my greatest work yet.

## So give me a few words that describes this simply, none of that developer jargon.
An easy to use, sane game engine for some. A neat way to escape from ROBLOX's grasp for most.
