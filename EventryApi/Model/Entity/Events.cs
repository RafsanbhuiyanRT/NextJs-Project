namespace EventryApi.Model.Entity;
#nullable disable
public class Events
{
    public int Id { get; set; }
    public string Name { get; set; }
    public string Details { get; set; }
    public string Location { get; set; }            
    public string imageUrl { get; set; }
    public string InterestedId { get; set; }
    public string ParticipantsId { get; set; }
    public string Swags { get; set; }
}
