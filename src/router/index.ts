import {Router} from 'restify-router'
import {bootcampRoute} from './bootcamp.router'

const PrincipalRouter = new Router()

const ThreeRouter = new Router()

ThreeRouter.add('/transform', bootcampRoute)

PrincipalRouter.add('/api/v1', ThreeRouter)

export default PrincipalRouter