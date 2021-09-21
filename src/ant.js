export default class Ant {

    constructor(x_range = (0, 99), y_range = (0, 99), ant_position = (0, 0), ant_direction = "N") {
        this.ant_position = ant_position;
        this.x_range = x_range;
        this.y_range = y_range;
        this.ant_direction = ant_direction;
        this.grid = [];
        
        // Populate grid with blank cells
        // blank: 0, active: 1
        for(let i = y_range[1]; i >= 0; i--) {
            let grid_row = [];
            for (let j = x_range[1]; j >= 0; j--) {
                grid_row.push(0);
            }
        }
    }

    isCellActive() {
        let pos_to_check = this.ant_position;

        // TODO: Check bounds
        switch(this.ant_direction) {
            case "N":
                pos_to_check = (pos_to_check[0], pos_to_check[1] + 1);
                break;
            case "E":
                pos_to_check = (pos_to_check[0] + 1, pos_to_check[1]);
                break;
            case "S":
                pos_to_check = (pos_to_check[0], pos_to_check[1] - 1);
                break;
            case "W":
                pos_to_check = (pos_to_check[0] - 1, pos_to_check[1] + 1);
                break;
            default:
                // TODO: Raise exception
                break;
        }

        // Check if cell in front is active
        const cell_is_active = this.grid(pos_to_check[0], pos_to_check[1]) === 1;

        return cell_is_active;
    }

    getAntPos() {
        return this.ant_position;
    }

}