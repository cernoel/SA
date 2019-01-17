Mini - Readme for Ubuntu only.
you might need to "chmod +x *.sh" .. so all sh files are executeable
you also might to need "deb http://cz.archive.ubuntu.com/ubuntu xenial main universe" .. in apt/sources.list, so that you can download postgre 9.5 stuff.

1.) Install dependencies with "sudo ./install_local_depebdencies.sh"
2.) Then set up Database with 
    a) "./pipeline_command_download.sh" .. if you have not copied the required files, this will download osm files.
    b) "./pipeline_command_local.sh" .. if you have the required files copied into the same folder as the setup files.
