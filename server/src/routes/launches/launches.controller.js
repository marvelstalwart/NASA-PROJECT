const {
    getAllLaunches,
    existsLaunchWithId,
   scheduleNewLaunch,
    abortLaunchById,
} = require("../../models/launches.model")
async function httpGetAllLaunches (req, res){

    return res.status(200).json(await getAllLaunches())

}

async  function httpAddNewLaunch (req, res) {
    const launch = req.body
    if (!launch.mission || !launch.rocket || !launch.launchDate ||
        !launch.target) {
            return res.status(400).json({

                error: 'Missing required launch property'
            })

        }
        launch.launchDate = new Date(launch.launchDate)
        if (isNaN(launch.launchDate)){
            return res.status(400).json ({
                error: "Invalid date"
            })
        }



    await scheduleNewLaunch(launch)
    return res.status(201).json(launch)

}

 async function httpAbortLaunch(req, res) {
    const launchId = Number(req.params.id)
    //if launch does not exist
    const existsLaunch  = await existsLaunchWithId(launchId)
    if (!existsLaunch) {
        return res.status(404).json ({
            error: 'Launch not found',
        })

    }

    //If launch does exist
    const aborted = await abortLaunchById(launchId)
    if (!aborted) {
        return res.status(400).json({
            error: 'Launch not aborted'
        })
    }
    return res.status(200).json({
        ok: true

    }
    )
}

module.exports = {
    httpAbortLaunch,
    httpGetAllLaunches,
    httpAddNewLaunch
}