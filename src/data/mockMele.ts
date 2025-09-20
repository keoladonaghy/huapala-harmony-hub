import { CanonicalMele } from "@/types/mele";

// Import all the real mele data
import haleakalaHula from "./mele/haleakala_hula_canonical.json";
import eHoiIKaPili from "./mele/e_hoi_i_ka_pili_canonical.json";
import kaHinanoOPuna from "./mele/ka_hnano_o_puna_canonical.json";
import piliMauMeOe from "./mele/pili_mau_me_oe_canonical.json";
import leiIlima from "./mele/lei_ilima_canonical.json";
import iesuMeKeKanakaWaiwai from "./mele/iesu_me_ke_kanaka_waiwai_canonical.json";
import hehaWaipio from "./mele/heha_waipio_canonical.json";

export const realMeleData: CanonicalMele[] = [
  haleakalaHula as CanonicalMele,
  eHoiIKaPili as CanonicalMele,
  kaHinanoOPuna as CanonicalMele,
  piliMauMeOe as CanonicalMele,
  leiIlima as CanonicalMele,
  iesuMeKeKanakaWaiwai as CanonicalMele,
  hehaWaipio as CanonicalMele,
];