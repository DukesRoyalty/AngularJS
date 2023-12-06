import { Injectable } from '@angular/core';
import { Card } from '../data/card';
import { Profile } from '../model/profile-form';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileFormService {

  constructor(private storageService: StorageService) { }

  onPaymentFormSaved(profile: Profile): void {
    /* determine is we currently have profiles */
    if(JSON.parse(localStorage.getItem("profiles")).length > 0) {

      let currentProfiles = this.storageService.getStorageByKey("profiles");
      if(currentProfiles.some(pro => pro.shipping.name === profile.shipping.name)) {
        return this.updateProfileInMemory(currentProfiles, profile);
      }

      currentProfiles.push(profile);
      this.saveProfilesToMemory(JSON.stringify(currentProfiles))
    } else {

      this.saveProfilesToMemory(JSON.stringify([profile]))
    };
  };

  saveProfilesToMemory(profiles: string):void {
    this.storageService.store("profiles", profiles);
  }

  updateProfileInMemory(profiles: Profile[], profile: Profile):void {
    profiles.forEach(pro => {
      if(pro.shipping.name === profile.shipping.name) {
        pro = profile
      }
    })
    this.saveProfilesToMemory(JSON.stringify(profiles))
  }

  deleteProfilesFromMemory():void {
    this.storageService.clear("profiles")
    localStorage.setItem("profiles", JSON.stringify([]))
  }

  deleteProfileFromMemory(name:string):void {
    let profiles = this.storageService.getProfilesFromDisk();
    profiles = profiles.filter(profile => profile.shipping.name !== name)
    this.saveProfilesToMemory(JSON.stringify(profiles))
  }

  getAllProfilesFromMemory():Profile[] {
    return this.storageService.getStorageByKey("profiles");
  }

  createCard(profile: Profile): Card {
    console.log(profile.shipping)
    let card = new Card();
    card.profileName = profile.shipping.name
    card.card_number = profile.payment.number
    card.month = profile.payment.month
    card.year = profile.payment.year
    return card;
  };

  mapUpdatedProfile(currentProfile: Profile, updatedProfile: Profile): Profile {
    currentProfile.shipping = updatedProfile.shipping;
    currentProfile.billing = updatedProfile.billing;
    currentProfile.payment = updatedProfile.payment
    return currentProfile
  }
}
