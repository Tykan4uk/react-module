## About The Project

This project implements UI for moderation. 
Backend - C# REST API.
Database - MS SQL.

The site allows:
1) Upload music files and send them to API, where they are trimmed to 10-second fragment, stored in BLOB-storage, and write song information to database;
2) Search added songs, listen to them, and report any mistake in description.

Design Reference: [design](https://app.moqups.com/LTb5zOxHHLW3tRfnELOA6ExzimJVOVAV/view/page/ac37097b9)

## Task set for the module

1) Viewing list of music;
2) Pagination and page size;
3) Downloading files.
4) Sequential sorting by name (for example, first by author, then by song title);
6) Finding songs by name\author;
7) Listening to music fragment;
8) Progress bar while downloading files;
9) Registration/Authorization/Authentication;
10) Ability to send report on incorrect song data.
