# OpenBloxEngine
Easily create singleplayer web experiences by modifying your ROBLOX place slightly, saving your place to a local ROBLOX XML file, and replacing the REPLACEME.
Each script will be a function with the same name, interpreted as JS code. Additional functions will be enclosed within functions with name pattern `${SCRIPTNAME}${FUNCNAME}`.
IntValues, StringValues, and BoolValues will be stored as variables with the same names in the script interpreting function. Objects interpreted as bricks or spheres will be placed in the Workspace dictonary, for instance: `partWorkspace = {"spheres":["part1","infoSphere"."metaSphere","hackerSphere","part3"],"bricks":["part2","Baseplate"]}`


## Valid scripting examples..
`Instance.new("Script") --will automatically create a function in the script interpriting function with a numbered id ranging from OBSCRIPT1 on up.`
`Instance.new("ForceField") --creates new forcefield around the player`
`Instance.new("Part") --creates new Part at Vector3.new(0,0,0)`
`Instance.new("Part").Position = Vector3.new(1,2,3) --creates new Part at Vector3.new(1,2,3)`
`baseplate = Instance.new("Part") --creates a reference 'baseplate' to a new part.`
`game.Players.LocalPlayer.Humanoid.Health = 0 --Kills the player`
`game.Players.LocalPlayer.Humanoid.Health = math.huge --Gods the player`
`game.Players.LocalPlayer.Humanoid.JumpPower = 50 --Default JumpPower`
`game.Players.LocalPlayer.Humanoid.WalkSpeed = 16 --Default WalkSpeed`

# FAQ
## Help! My scripts don't work!
*Be sure you are treating all scripts as old ROBLOX code with the new functions, except for RemoteEvent functions.* This means, for example, you dont FireServer for money, you just set the intvalue directly. If it still doesnt work, I havent implemented the function yet.

## Why arent my Decals available when ROBLOX/my internet is down!?!

Due to certain ROBLOX EULA restrictions, we cannot download assets from their site.
