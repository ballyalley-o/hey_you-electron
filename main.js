const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

function main() {
  // Check if the required arguments are provided
  if (process.argv.length !== 5) {
    console.log(
      'Usage: node script.js <folder_path> <mass_unit> <surface_area_unit>'
    )
    return
  }

  // Get the folder that contains the SolidWorks files to add mass and surface area to.
  const folder = process.argv[2]

  // Get the desired unit of measurement for mass and surface area.
  const massUnit = process.argv[3]
  const surfaceAreaUnit = process.argv[4]

  // Iterate over all of the files in the folder.
  const files = fs.readdirSync(folder)
  files.forEach((file) => {
    // Run SolidWorks script using a child process
    const command = `swscript.exe ${path.join(
      __dirname,
      'solidworks_script.py'
    )} "${path.join(folder, file)}" "${massUnit}" "${surfaceAreaUnit}"`
    const output = execSync(command).toString()
    console.log(output)
  })
}

console.log(main())
