import { axiosInstance } from "../../axiosInstance";

export const editCompany = async ({
    id,
    description,
    address,
    currency,
    website_url,
    facebook,
    instgram,
    tiktok,
    youtube,
    snapshat,
    whatsapp,
    google_buss,
    trustpilot_link,
    wifi_pass,
    cover_image,
    facebook_pixel,
    tiktok_pixel,
    ads_pixel,
    anylytics
}) => {
    try{

        const res = await axiosInstance.put('/api/infos/'+id, {
            description: description,
            address: address,
            currency: currency,
            website_url: website_url,
            facebook: facebook,
            instgram: instgram,
            tiktok: tiktok,
            youtube: youtube,
            snapshat: snapshat,
            whatsapp: whatsapp,
            google_buss: google_buss,
            trustpilot_link: trustpilot_link,
            wifi_pass: wifi_pass,
            cover_image: cover_image,
            facebook_pixel: facebook_pixel,
            tiktok_pixel: tiktok_pixel,
            ads_pixel: ads_pixel,
            anylytics: anylytics,
        })
        if(res)
        {
            console.log('the updated success => ',res);
        }
        return res.data;
    }
    catch(err)
    {
        console.log("The Error => ",err );
    }
}
export const postCompany = async ({
    description,
    address,
    currency,
    website_url,
    facebook,
    logo,
    instgram,
    tiktok,
    youtube,
    snapshat,
    whatsapp,
    google_buss,
    trustpilot_link,
    wifi_pass,
    cover_image,
    facebook_pixel,
    tiktok_pixel,
    ads_pixel,
    anylytics,
    resto_id
}) => {
    try{

            // Append each data field to the FormData object
            const formData = new FormData();

            formData.append('description', description);
            formData.append('address', address);
            formData.append('currency', currency);
            formData.append('website_url', website_url);
            formData.append('facebook', facebook);
            formData.append('instagram', instgram);
            formData.append('tiktok', tiktok);
            formData.append('youtube', youtube);
            formData.append('snapchat', snapshat);
            formData.append('whatsapp', whatsapp);
            formData.append('google_buss', google_buss);
            formData.append('trustpilot_link', trustpilot_link);
            formData.append('wifi_pass', wifi_pass);
            if (cover_image) {
                formData.append('cover_image', cover_image);
            }
            if (logo) {
                formData.append('logo', logo);
            }
            formData.append('facebook_pixel', facebook_pixel);
            formData.append('tiktok_pixel', tiktok_pixel);
            formData.append('ads_pixel', ads_pixel);
            formData.append('analytics', anylytics);
            formData.append('resto_id', resto_id);
        const res = await axiosInstance.post('/api/infos', formData,{
            headers: {
                'Content-Type': 'multipart/form-data', // This can actually be omitted
            },
        })
        if(res)
        {
            console.log('the added success => ',res);
        }
        return res.data;
    }
    catch(err)
    {
        console.log("The Error of Info => ",err.response.message );
    }
}