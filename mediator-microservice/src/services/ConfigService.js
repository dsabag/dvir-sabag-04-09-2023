import axios from "axios";

export class ConfigService {
  #configUrl = "";

  constructor(url) {
    this.#configUrl = url;
  }

  fetchConfig = async () => {
    const { data } = await axios.get(this.#configUrl);
    return data;
  };
}
