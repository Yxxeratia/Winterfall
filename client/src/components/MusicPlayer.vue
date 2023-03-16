<template>
    <div class="audio-container">
        <div class="audio-wrapper">
            <div class="dropdown-container">
                <div class="dropdown-wrapper">
                    <span v-for="track in tracks" :key="track.id" @click="changeTrack(track.id)"> {{ track.by }} - {{ track.name }}</span>
                </div>
            </div>
            <font-awesome-icon icon="fa-solid fa-caret-down" class="icons" />
            <span style="left: 5px;">Now Playing: {{ currentTrack?.by }} - {{ currentTrack?.name }}</span>
            <audio v-for="track in tracks" :key="track.id" :src= " 'src/audio/' + track.fileName" :id="'track' + track.id"></audio>
        </div>  

        <div class="buttons">
            <button class="button" @click="prevTrack">
                <font-awesome-icon icon="fa-solid fa-caret-left" class="icons" />
            </button>
            <button class="button" @click=" togglePlay(currentTrackIndex)">
                <font-awesome-icon icon="fa-solid fa-play" class="icons" />
                <font-awesome-icon icon="fa-solid fa-pause" class="icons" />
            </button>
            <button class="button" @click="nextTrack">
                <font-awesome-icon icon="fa-solid fa-caret-right" class="icons" />
            </button>
        </div>
  </div>
</template>

<script lang="ts">
import * as $ from 'jquery';


import GetTracks from '@/services/GetTracks';

    interface Track {
        id: number,
        name: string,
        by: string,
        fileName: string,
    }

    export default {
        data() {
            return {
                tracks: [] as Track[],
                currentTrackIndex: 0,
                playing: false,
            }
        },
        methods: {
            setTrackId(trackId: number) {
                this.currentTrackIndex = trackId;
            },

            playTrack(trackId: number) {
                $(".button .fa-play").hide();
                $(".button .fa-pause").fadeIn();
                $(`#track${trackId}`)[0].volume = 0.5;
                $(`#track${trackId}`)[0].play();
                this.playing = true;

                this.continuePlaying();
            },
            
            continuePlaying() {
                let audio = <HTMLElement> document.getElementById(`track${this.currentTrackIndex}`);

                if (audio) {
                    audio.onended = () => {
                        if (this.currentTrackIndex === this.tracks.length-1) {
                            this.currentTrackIndex = 0;
                        }
                        else {
                            this.currentTrackIndex++;
                        }
                        this.playTrack(this.currentTrackIndex)
                    }
                }
            },
            pauseTrack() {
                $(".button .fa-pause").hide();
                $(".button .fa-play").fadeIn();
                $(`#track${this.currentTrackIndex}`)[0].pause();
                this.playing = false;
            },

            stopTrack() {
                $(`#track${this.currentTrackIndex}`)[0].pause();
                $(`#track${this.currentTrackIndex}`)[0].currentTime = 0;
                this.playing = false;
            },

            togglePlay(trackId: number) {
                if (!this.playing) {
                    this.playTrack(trackId);
                }
                else {
                    this.pauseTrack();
                }
            },

            prevTrack() {
                // stop completely
                this.stopTrack();

                if (this.currentTrackIndex > 0) {
                    this.currentTrackIndex--;
                }
                else {
                    this.currentTrackIndex = this.tracks.length-1;
                }
                // auto play prev
                this.playTrack(this.currentTrackIndex);
            },

            nextTrack() {
                //stop completely
                this.stopTrack();

                if (this.currentTrackIndex === this.tracks.length-1) {
                    this.currentTrackIndex = 0;
                }
                else {
                    this.currentTrackIndex++;
                }
                // auto play next
                this.playTrack(this.currentTrackIndex);
            },

            changeTrack(trackId: number) {
                if (this.playing) {
                    this.stopTrack();
                }
                this.setTrackId(trackId);
                this.playTrack(this.currentTrackIndex);
            }

        },
        computed: {
            currentTrack() {
                return this.tracks[this.currentTrackIndex];
            }
        },
        async mounted() {
            //get tracks
            const tracksTemp = await GetTracks.execute();
            this.tracks = tracksTemp;
        }
    }
</script>

<style scoped>
.audio-container {
  width: 40%;
  height: 40px;
  left: 3%;
}

.audio-wrapper {
  position: relative;
  display: inline-block;
}

.dropdown-container {
  display: none;
  position: absolute;
  background-color: snow;
  min-width: 160px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  padding: 12px 16px;
  top: 20px;
  z-index: 1;
  color: black;
  border: 3px solid black;
  border-radius: 10px;
}

.dropdown-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 10px;
    flex-direction: column;
}

.audio-wrapper:hover .dropdown-container {
  display: block;
}

.dropdown-wrapper > span {
    cursor: pointer;
} 

.dropdown-wrapper > span:hover {
    text-decoration: underline;
}

.buttons {
  display: flex;
  justify-content: left;
  gap: 20px;
  height: 20px;
  top: 5px;
  left: 15%;
}

.button {
    cursor: pointer;
}

.icons {
  width: 15px;
  height: 15px;
}

.fa-pause {
    display: none;
}
</style>