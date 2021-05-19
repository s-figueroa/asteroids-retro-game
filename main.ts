namespace SpriteKind {
    export const asteroid = SpriteKind.create()
    export const spaceShip = SpriteKind.create()
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.spaceShip, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.ashes, 100)
    info.changeLifeBy(-1)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    shoot()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.asteroid, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    otherSprite.destroy(effects.ashes, 100)
    info.changeLifeBy(-1)
})
controller.right.onEvent(ControllerButtonEvent.Repeated, function () {
    transformSprites.changeRotation(mySprite, rotateAmount)
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    transformSprites.changeRotation(mySprite, 0 - rotateAmount)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    transformSprites.changeRotation(mySprite, rotateAmount)
})
function shoot () {
    shotAngle = (transformSprites.getRotation(mySprite) - 90) * 3.1416 / 180
    shotVx = shotVelocity * Math.cos(shotAngle)
    shotVy = shotVelocity * Math.sin(shotAngle)
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . b b . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, shotVx, shotVy)
}
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.spaceShip, function (sprite, otherSprite) {
    info.changeScoreBy(100)
    sprite.destroy()
    otherSprite.destroy(effects.disintegrate, 100)
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.asteroid, function (sprite, otherSprite) {
    info.changeScoreBy(50)
    otherSprite.setImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . c c c c c . . . . 
        . . . . c c c f f f f f c . . . 
        . . . c f f f f f f f f f c . . 
        . . . c f f f f f f f f f f c . 
        . . . c f f f f f f f f f f c . 
        . . c f f f f f f f f f f f c . 
        . c f f f f f f f f f f f f c . 
        . c f f f f f f f f f f f c . . 
        . c f f f f f f f f f f f c . . 
        . c f f f f f f f f f f f c . . 
        . . c c f f f f f f f f f c . . 
        . . . . c c c c c f f f c . . . 
        . . . . . . . . . c c c . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    projectile.destroy()
    if (sprite.overlapsWith(otherSprite)) {
        otherSprite.setImage(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . c c c c . . . . . 
            . . . . . c c f f f f c . . . . 
            . . . . c f f f f f f f c . . . 
            . . . c f f f f f f f f c . . . 
            . . . c f f f f f f f f c . . . 
            . . . c f f f f f f f c . . . . 
            . . . c f f f f f f f c . . . . 
            . . . . c f f c c f f c . . . . 
            . . . . . c c . . c c . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
        projectile.destroy()
    }
    if (sprite.overlapsWith(otherSprite)) {
        otherSprite.destroy(effects.ashes, 100)
        projectile.destroy()
    }
})
controller.left.onEvent(ControllerButtonEvent.Repeated, function () {
    transformSprites.changeRotation(mySprite, 0 - rotateAmount)
})
let projectile3: Sprite = null
let projectile2: Sprite = null
let projectile: Sprite = null
let shotVy = 0
let shotVx = 0
let shotAngle = 0
let shotVelocity = 0
let rotateAmount = 0
let mySprite: Sprite = null
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . b . . . . . . . . 
    . . . . . . b b b . . . . . . . 
    . . . . . b b b b b . . . . . . 
    . . . . b b b b b b b . . . . . 
    . . . . b b . . . b b . . . . . 
    . . . . b . . . . . b . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
rotateAmount = 10
shotVelocity = 100
info.setScore(0)
info.setLife(3)
game.onUpdateInterval(1000, function () {
    projectile2 = sprites.createProjectileFromSide(img`
        . . . . . . . c c c c c . . . . 
        . . . . c c c f f f f f c . . . 
        . . . c f f f f f f f f f c c . 
        . . . c f f f f f f f f f f c . 
        . . . c f f f f f f f f f f f c 
        . . c f f f f f f f f f f f f c 
        . . c f f f f f f f f f f f f c 
        . . c f f f f f f f f f f f f c 
        . c f f f f f f f f f f f f c . 
        c f f f f f f f f f f f f f c . 
        c f f f f f f f f f f f f c . . 
        c f f f f f f f f f f f f c . . 
        . c f f f f f f f f f f f c . . 
        . . c f f f f f f f f f f c . . 
        . . . c c c c c f f f c c . . . 
        . . . . . . . . c c c . . . . . 
        `, randint(0, 10) - 100, randint(0, scene.screenWidth()) - 100)
    projectile2.setKind(SpriteKind.asteroid)
    if (info.score() > 1000 && Math.percentChance(45)) {
        projectile3 = sprites.createProjectileFromSide(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . c c c c . . . . . . 
            . . . . . c c c c c c . . . . . 
            . . . . c c c c c c c c . . . . 
            . . c c . . . . . . . . c c . . 
            . . . . c . . . . . . c . . . . 
            . . . . . c c c c c c . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, randint(0, scene.screenWidth()) - 15, randint(0, scene.screenHeight()) - 15)
        projectile3.follow(mySprite, 25)
        projectile3.setKind(SpriteKind.spaceShip)
    }
})
