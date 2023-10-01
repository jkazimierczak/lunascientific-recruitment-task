# Recruitment task - Aquaponic Iot Module - Frontend

![hero](https://github.com/jkazimierczak/lunascientific-recruitment-task/assets/77862767/b94a0011-87dc-4045-b95e-eb92a85fe0f3)


## Usage

To start the frontend:

1. Clone the repository.
2. Enter `frontend` directory.
3. Install dependencies with `pnpm i`.
4. Run the project with `pnpm dev`.
5. Open browser and go to [`http://localhost:5173/`](http://localhost:5173/).

Frontend will run fine with backend being either online or offline.

## What I've added

Besides implementing just the obligatory requirements, I also added:

- Added component tests (`pnpm test`).
- Added search bar.
- Added ability to add new module (as POST endpoint was exposed).
    - It required modification of backend though to accept 0 for `targetTemperature`, to comply with specification (task
      part 3).
- Added indicator of connection status.
- Added skeletons and loaders.
- Error handling:
    - Non-existent module specified in URL,
    - No network connection (app will try to reconnect and refetch data).
- Handled edge cases (mostly after going from offline to online):
    - If connection to socket is established prior to fetching `/modules`, then app waits for the fetch to complete.

> When run on localhost it's everything works quite fast. To see the loaders, skeletons or status indicators in work
> throttle the network from network tab once the app loads.
